import React, { useState } from 'react';
import { storage, db, auth } from '../../functions/firebase'; // Import storage, db, and auth from firebase.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

interface AvatarUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarUploaderModal: React.FC<AvatarUploaderModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null; // Only render if modal is open

  // Handle file selection from computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    setImageUrl(''); // Clear URL input if a file is selected
  };

  // Handle URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setSelectedFile(null); // Clear file input if a URL is provided
  };

  const handleUpload = async () => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    setIsUploading(true);

    try {
      let downloadURL = '';

      if (selectedFile) {
        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `avatars/${userId}`);
        await uploadBytes(storageRef, selectedFile);
        downloadURL = await getDownloadURL(storageRef);
      } else if (imageUrl) {
        // Use the provided URL as the image URL
        downloadURL = imageUrl;
      }

      if (downloadURL) {
        // Update Firestore with the download URL
        const userDocRef = doc(db, 'user_profile', userId);
        await updateDoc(userDocRef, { avatar: downloadURL });
        alert('Avatar updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar.');
    } finally {
      setIsUploading(false);
      onClose(); // Close modal after upload
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times; {/* Close button */}
        </button>
        
        <h2 className="text-lg font-bold mb-4 text-center">Upload or Set Avatar</h2>
        
        <div className="flex items-center space-x-4 mb-4">
          {/* Input for file upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-[120px]"
          />

          {/* Input for image URL */}
          <input
            type="text"
            placeholder="Or paste image URL"
            value={imageUrl}
            onChange={handleUrlChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Display preview of selected file or URL */}
        <div className="mb-4">
          {selectedFile && (
            <center>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            />
            </center>
          )}
          {!selectedFile && imageUrl && (
            <center>
            <img
              src={imageUrl}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            />
            </center>
          )}
        </div>

        {/* Upload button */}
        <center>
                <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-4 py-2 rounded ${isUploading ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'}`}
                >
                {isUploading ? 'Uploading...' : 'Save Avatar'}
                </button>
        </center>
      </div>
    </div>
  );
};

export default AvatarUploaderModal;
