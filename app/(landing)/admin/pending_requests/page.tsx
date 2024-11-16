"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { collection, onSnapshot, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../functions/firebase";
import sendEmailNotification from "../../functions/sendEmail";
import RejectModal from "./RejectRequestModa";
import UserRejectModal from "./UserRejectModal";
import Image from "next/image";

type LostPet = {
  DocumentId: string;
  DocumentImages: string;
  Username: string;
  UserEmail: string;
  Name: string;
  Size: string;
  Breed: string;
  Gender: string;
  Color: string;
  AdditionalInfo: string;
  FullAddress: string;
  Type: string;
  LastDate: string;
  Images: string;
};

type FoundPet = {
  DocumentId: string;
  DocumentImages: string;
  Username: string;
  UserEmail: string;
  Name: string;
  Size: string;
  Breed: string;
  Gender: string;
  Color: string;
  AdditionalInfo: string;
  FullAddress: string;
  Type: string;
  FoundDate: string;
  Images: string;
};

type VerifyUsers = {
  userId: string;
  isAdminVerified: boolean;
  isRejected: boolean;
  email: string;
};

type TableType = "lostPets" | "foundPets" | "pendingUsers";

export default function PetRequestTables() {
  const [selectedTable, setSelectedTable] = useState<TableType>("lostPets");
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [foundPets, setFoundPets] = useState<FoundPet[]>([]);
  const [pendingUsers, setPendingUsers] = useState<VerifyUsers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [modalPetInfo, setModalPetInfo] = useState<LostPet | FoundPet | null>(null);
  const [modalUserInfo, setModalUserInfo] = useState<VerifyUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserRejectModal, setShowUserRejectModal] = useState(false);

  const handleOpenRejectModal = (pet: LostPet | FoundPet) => {
    setModalPetInfo(pet);
    setShowRejectModal(true);
  };

  const handleOpenRejectModalUser = (user: VerifyUsers) => {
    setModalUserInfo(user);
    setShowUserRejectModal(true);
  };

  const handleReject = async (pet: LostPet | FoundPet, reason: string) => {
    try {
      const petRef = doc(db, selectedTable === "lostPets" ? "pending_lost_pets_db" : "pending_found_pets_db", pet.DocumentId);
      
      // Delete the document from the current collection
      await deleteDoc(petRef);

      // Send email notification to the user
      await sendEmailNotification(pet.UserEmail);

      alert(`Pet ${pet.Username} application has been rejected.`);
    } catch (error) {
      console.error("Error rejecting the pet:", error);
      alert("There was an error rejecting the pet.");
    }
  };

  const handleRejectPendingUser = async (user: VerifyUsers) => {
    try {
      // Optionally send an email notification
      await sendEmailNotification(user.email);

      const response = await fetch('/api/delete-user', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      console.log(data.message);

      alert(`User ${user.email} has been rejected.`);
    } catch (error) {
      console.error("Error rejecting the user:", error);
      alert("There was an error rejecting the user.");
    }
  };

  useEffect(() => {
    const lostPetsUnsub = onSnapshot(collection(db, "pending_lost_pets_db"), (snapshot) => {
      setLostPets(snapshot.docs.map((doc) => ({ ...doc.data() } as LostPet)));
    });

    const foundPetsUnsub = onSnapshot(collection(db, "pending_found_pets_db"), (snapshot) => {
      setFoundPets(snapshot.docs.map((doc) => ({ ...doc.data() } as FoundPet)));
    });

    const pendingUsersUnsub = onSnapshot(collection(db, "pending_user_profile"), (snapshot) => {
      setPendingUsers(snapshot.docs.map((doc) => ({...doc.data() as VerifyUsers})));
    })

    return () => {
      lostPetsUnsub();
      foundPetsUnsub();
      pendingUsersUnsub();
    };
  }, []);

  const handleTableChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value as TableType);
    setCurrentPage(1);
  };

  const openModal = (pet: LostPet | FoundPet) => {
    setModalImageUrl(pet.Images);
    setModalPetInfo(pet);
    setIsModalOpen(true);
    setIsLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
    setModalPetInfo(null);
  };

  const handleAccept = async (pet: LostPet | FoundPet) => {
    try {
      // Determine collection based on table type
      const sourceCollection = selectedTable === "lostPets" ? "pending_lost_pets_db" : "pending_found_pets_db";
      const destinationCollection =
        selectedTable === "lostPets" ? "lost_pets_db" : "found_pets_db";

      // Delete the pet from the source collection
      await deleteDoc(doc(db, sourceCollection, pet.DocumentId));

      // Add the pet to the new collection
      await setDoc(doc(db, destinationCollection, pet.DocumentId), {
        ...pet,
      });

      console.log("Pet moved successfully");
    } catch (error) {
      console.error("Error moving pet: ", error);
    }
  };

  const handleAcceptUser = async (user: VerifyUsers) => {
    try {
      const sourceCollection = selectedTable === "pendingUsers" ? "pending_user_profile" : "";
      const destinationCollection = selectedTable === "pendingUsers" ? "user_profile" : "";
      
      await deleteDoc(doc(db, sourceCollection, user.userId));

      await setDoc(doc(db, destinationCollection, user.userId), {
        isAdminVerified: !user.isAdminVerified,
        userId: user.userId,
        email: user.email,
        hasCompletedRegistration: false,
      });

      console.log("User moved successfully");
    }
    catch (error) {
      console.error("Error moving user: ", error);
    }
  }

  const renderTable = () => {
    let data: any[] = [];
    if (selectedTable === "lostPets") data = lostPets;
    if (selectedTable === "foundPets") data = foundPets;
    if (selectedTable === "pendingUsers") data = pendingUsers;

    // Slice the data to get the items for the current page
    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (selectedTable === "pendingUsers") {
      return (
        <table className="w-full text-center bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-300 border-b">
            <tr>
              <th className="py-3 px-6 font-semibold text-sm text-gray-600">User Id</th>
              <th className="py-3 px-6 font-semibold text-sm text-gray-600">Email</th>
              <th className="py-3 px-6 font-semibold text-sm text-gray-600">Status</th>
              <th className="py-3 px-6 font-semibold text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.userId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{user.userId}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
              <span
                className={`rounded-full text-xs font-medium ${
                  user.isRejected === false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {`${user.isRejected === false ? "Pending" : "Rejected"}`}
              </span>
            </td>
                <td className="py-3 px-6 space-x-2">
                  <button
                    onClick={() => handleAcceptUser(user)}
                    className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700 text-sm"
                  >
                    Accept
                  </button>
                  {user.isRejected === false && (
                    <button
                    onClick={async () => {
                      try {
                      const sourceCollection = selectedTable === "pendingUsers" ? "pending_user_profile" : "";

                      await updateDoc(doc(db, sourceCollection, user.userId), {
                        isRejected: true,
                      });
                      }
                      catch (error) {
                        console.error("Error rejecting user: ", error);
                      }
                    }}
                    className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm"
                  >
                    Reject
                  </button>)}
                  {user.isRejected === true && (
                    <button
                    onClick={() => handleOpenRejectModalUser(user)}
                    className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
    <table className="w-full text-center bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-300 border-b">
        <tr>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Username</th>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Pet Name</th>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Type</th>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Date Lost/Found</th>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Pet Document</th>
          <th className="py-3 px-6 font-semibold text-sm text-gray-600">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((pet) => (
          <tr key={pet.DocumentId} className="border-b hover:bg-gray-50">
            <td className="py-3 px-6">{pet.Username}</td>
            <td className="py-3 px-6">{pet.Name}</td>
            <td className="py-3 px-6">{pet.Type}</td>
            <td className="py-3 px-6">
              {"LastDate" in pet ? pet.LastDate : pet.FoundDate}
            </td>
            <td className="py-3 px-6">
              {pet.Images ? (
                <button
                  onClick={() => openModal(pet)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              ) : (
                "No Image"
              )}
            </td>
            <td className="py-3 px-6 space-x-2">
              <button
                onClick={() => handleAccept(pet)}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700 text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => handleOpenRejectModal(pet)}
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm"
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Requests Table</h1>
      <label htmlFor="tableSelect" className="block text-lg font-medium mb-2">
        Select Table:
      </label>
      <select
        id="tableSelect"
        value={selectedTable}
        onChange={handleTableChange}
        className="w-[150px] p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="lostPets">Lost Pets</option>
        <option value="foundPets">Found Pets</option>
        <option value="pendingUsers">Pending Users</option>
      </select>

      {/* Render the selected table */}
      {renderTable()}

      {/* Pagination controls */}
      <div className="absolute bottom-0 w-full max-w-[1000px] flex justify-between items-center mt-4 p-4 bg-white shadow-md">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{" "}
          {Math.max(
            1, // Ensure that at least 1 page is shown even if there are no items
            Math.ceil(
              (selectedTable === "lostPets"
                ? lostPets.length
                : selectedTable === "foundPets"
                ? foundPets.length
                : pendingUsers.length) / itemsPerPage
            )
          )}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage ===
            Math.max(
              1, // Ensure that at least 1 page is shown even if there are no items
              Math.ceil(
                (selectedTable === "lostPets"
                  ? lostPets.length
                  : selectedTable === "foundPets"
                  ? foundPets.length
                  : pendingUsers.length) / itemsPerPage
              )
            )
          }
          className="bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>


      {/* Modal for viewing the image and additional information */}
      {isModalOpen && modalImageUrl && modalPetInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center -space-y-5">
            <h2 className="text-lg font-bold text-center p-2 bg-blue-400 w-[200px] text-white rounded z-10">
              Document Evidence
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                onClick={closeModal}
                className="text-gray-500 absolute top-1 right-4 font-bold text-xl"
              >
                &times;
              </button>

              <div className="flex justify-center mb-4">
                {/* Loading spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                  </div>
                )}

                <Image
                  src={modalImageUrl.toString()}
                  width={300}
                  height={250}
                  alt="Pet Document"
                  className={`text-center min-w-[300px] object-contain mt-3 max-w-full max-h-screen md:max-h-[250px] ${!isLoading ? "rounded-lg border-blue-500 border-2" : ""}`}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>

              {/* Additional Information Section */}
              {!isLoading && (
                <div className="space-y-4 text-sm">
                <h3 className="text-xl font-semibold">Additional Information</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  {/* Column 1: Pet Name, Size, and Breed */}
                  <div className="flex flex-col space-y-2">
                    <p><strong>Pet Name:</strong> {modalPetInfo.Name}</p>
                    <p><strong>Size:</strong> {modalPetInfo.Size}</p>
                    <p><strong>Breed:</strong> {modalPetInfo.Breed}</p>
                  </div>

                  {/* Column 2: Gender and Color */}
                  <div className="flex flex-col space-y-2">
                    <p><strong>Gender:</strong> {modalPetInfo.Gender}</p>
                    <p><strong>Color:</strong> {modalPetInfo.Color}</p>
                  </div>
                </div>

                {/* Additional Information and Full Address */}
                <p><strong>Additional Info:</strong> {modalPetInfo.AdditionalInfo}</p>
                <p><strong>Full Address:</strong> {modalPetInfo.FullAddress}</p>
              </div>
              )}
            </div>
          </div>
        </div>
      )}
       {/* Reject Modal */}
       {showRejectModal && modalPetInfo && (
        <RejectModal
          pet={modalPetInfo}
          onReject={handleReject}
          onClose={() => setShowRejectModal(false)}
        />
      )}
      {showUserRejectModal && modalUserInfo && (
        <UserRejectModal
          user={modalUserInfo}
          onReject={handleRejectPendingUser}
          onClose={() => setShowUserRejectModal(false)}
        />
      )}

    </div>
  );
}
