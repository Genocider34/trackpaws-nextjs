"use client";

import React, { useState } from "react";

interface LostPet {
  DocumentId: string;
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
}

interface FoundPet {
  DocumentId: string;
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

interface RejectModalProps {
  pet: LostPet | FoundPet;
  onReject: (pet: LostPet | FoundPet, reason: string) => void;
  onClose: () => void;
}

const RejectModal: React.FC<RejectModalProps> = ({ pet, onReject, onClose }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onReject(pet, reason);
      onClose(); // Close modal after submitting
    } else {
      alert("Please provide a reason for rejection.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 font-bold text-xl">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Reject Reason</h2>
        <textarea
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Please provide a reason for rejecting this request."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Submit Rejection
        </button>
      </div>
    </div>
  );
};

export default RejectModal;
