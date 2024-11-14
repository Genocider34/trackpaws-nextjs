import React from 'react';
import Image from 'next/image';

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

interface PetRequestProps {
    pets: PendingRequestProps[];
}


const PetBoxComp: React.FC<PetRequestProps> = ({ pets }) => {
    return (
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-[300px] ml-11">
        <div className="flex flex-wrap justify-center gap-10 w-full h-full">
          {pets.map((pet) => (
            <div key={pet.DocumentId} className="border-2 border-blue-500 bg-white p-4 rounded-lg shadow-lg flex flex-col text-black w-[250px] relative">
              <center className='pt-5'>
                <h3 className="absolute top-[20px] bg-blue-500 text-white rounded-md p-2 text-center z-10 w-[90px]">
                  {pet.Tag}
                </h3>
                <Image
                  width={100}
                  height={100}
                  src={pet.Images !== ""? pet.Images.toString() : "/images/question_mark_icon.png"} 
                  alt={pet.Breed} 
                  className="w-[100px] h-[100px] object-cover mb-4 rounded border-2 border-gray-500" 
                />
              </center>
              <h3 className="font-bold text-center">{pet.Name}</h3>
              <p className="text-sm"><strong>Breed:</strong> {pet.Breed}</p>
              <p className="text-sm"><strong>Type:</strong> {pet.Type}</p>
              <p className="text-sm"><strong>Gender:</strong> {pet.Gender}</p>
              <p className="text-sm"><strong>District:</strong> {pet.District}</p>
              <p className="text-sm">
                <strong>Created At:</strong> {new Date(pet.CreatedAt.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
    );
};

export default PetBoxComp;