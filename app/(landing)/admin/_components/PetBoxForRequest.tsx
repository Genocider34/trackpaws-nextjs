import React from 'react';

// Define the type for the pet data
interface PetRequestProps {
  pet: {
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
}


const PetBox: React.FC<PetRequestProps> = ({ pet }) => {
    return (
        <div className="bg-white p-4 mr-10 rounded-lg shadow-lg flex flex-col text-black w-[100%]">
          <center className='pt-5'>
          <h3 className="absolute top-[345px] bg-blue-500 text-white rounded-md p-2 pl-3 pr-3 text-center z-10 w-[90px]">{pet.Tag}</h3>
          <img src={pet.Images} alt={pet.Breed} className="w-[100px] h-[100px] object-cover mb-4 rounded object-cover border-2 border-gray-500" />
          </center>
          <h3 className="font-bold text-center">{pet.Name}</h3>
          <p className="text-sm"><strong>Breed:</strong> {pet.Breed}</p>
          <p className="text-sm"><strong>Type:</strong> {pet.Type}</p>
          <p className="text-sm"><strong>Gender:</strong> {pet.Gender}</p>
          <p className="text-sm"><strong>District:</strong> {pet.District}</p>
          <p className="text-sm"><strong>Created At:</strong>{new Date(pet.CreatedAt.seconds * 1000).toLocaleDateString()}</p>
        </div>
    );
};

export default PetBox;