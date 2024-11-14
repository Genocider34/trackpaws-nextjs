"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../../functions/firebase';  // Import Firebase
import { collection, getDocs, DocumentSnapshot, limit, query, startAfter, where, orderBy } from 'firebase/firestore';
import PetBoxComp from './PetBoxComponent';

// Define the type for the pet data
interface PendingRequestProps {
    DocumentId: string;
    Images: string;
    Tag: string;
    Type: string;
    Name: string;
    Gender: string;
    Breed: string;
    District: string;
    CreatedAt: any;
}

const FoundPets: React.FC = () => {
  const [pets, setPets] = useState<PendingRequestProps[]>([]);
  const [page, setPage] = useState<number>(1); // Current page number
  const pageSize = 5;
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null); // Last visible document for pagination
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search input state
  const [hasNextPage, setHasNextPage] = useState<boolean>(true); // Whether there is a next page

  // Fetch pet requests data
  const fetchPets = async () => {
    try {
      // const querySnapshot = await getDocs(collection(db, 'found_pets_db'));
      // const petData = querySnapshot.docs.map((doc) => doc.data() as PendingRequestProps);
      // setPets(petData);  // Set the pet data to state
      let petQuery = query(collection(db, 'found_pets_db'), orderBy('CreatedAt', 'desc'), limit(pageSize));

      // Add search functionality if query is provided
      if (searchQuery.trim()) {
        petQuery = query(
          petQuery,
          where('Name', '>=', searchQuery),
          where('Name', '<=', searchQuery + '\uf8ff') // Ensuring it covers the full range for partial matches
        );
      }

      // Add pagination logic
      if (lastVisible) {
        petQuery = query(petQuery, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(petQuery);
      const petData = querySnapshot.docs.map((doc) => doc.data() as PendingRequestProps);

      setPets(petData);  // Set the pet data to state

      if (querySnapshot.docs.length < pageSize) {
        setHasNextPage(false); // No more pages if we fetched fewer pets than pageSize
      } else {
        setHasNextPage(true); // There might be another page if we fetched pageSize pets
      }

      // Update the last visible document for the next page
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  // Fetch pet data when the component mounts
  useEffect(() => {
    fetchPets();
  }, [page, searchQuery]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(1); // Reset to first page when search query changes
    setHasNextPage(true); // Reset the next page flag when search changes
    setLastVisible(null); // Reset pagination when search query changes
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
    {/* Counter section */}
      <h1 className="text-3xl font-bold mb-8">Found Pets</h1>

    {/* Search Input */}
    <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-100 p-3 border border-gray-300 rounded-md"
          placeholder="Search by pet name..."
        />
      </div>

    {/* Pet Box Container with separate height */}
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg flex-grow flex flex-wrap justify-center">
        <PetBoxComp pets={pets} />
      </div>

    {/* Pagination Controls */}
    <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Previous
        </button>

        {/* Page Number */}
        <span className="text-xl font-semibold">
          Page {page}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!hasNextPage} // Disable if no more pets to load
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FoundPets;
