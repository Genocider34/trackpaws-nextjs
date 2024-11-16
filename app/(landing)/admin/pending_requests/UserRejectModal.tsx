
import React from "react";

interface PendingUsers {
  userId: string;
  email: string;
  isAdminVerified: boolean;
  isRejected: boolean;
}

interface RejectModalProps {
  user: PendingUsers;
  onReject: (user: PendingUsers) => void;
  onClose: () => void;
}

const UserRejectModal: React.FC<RejectModalProps> = ({ user, onReject, onClose }) => {

  const handleSubmit = () => {
      onReject(user);
      onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 font-bold text-xl">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Reject User</h2>
        <p className="mb-4">
          Are you sure you want to reject the user <strong>{user.email}</strong>?
        </p>
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserRejectModal;
