"use client";

import React, {useEffect, useState} from 'react';
import { db, auth } from '../../functions/firebase';
import {getDocs, collection, Timestamp, query, orderBy, limit, onSnapshot} from 'firebase/firestore';
import PetBox from './PetBoxForRequest';

interface User {
  id: string;
  lastLogin? : Timestamp;
}

interface PendingRequest {
  DocumentId: string;
  Images: string;
  Tag: string;
  Type: string;
  Gender: string;
  Name: string;
  Breed: string;
  District: string;
  CreatedAt: Timestamp;
}

const UserStats: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0); // Store users data
    const [activeUsers, setActiveUsers] = useState<number>(0);
    const [nonActiveUsers, setNonActiveUsers] = useState<number>(0);
    const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

    const fetchInitialPets = async () => {
      try {
        const petsRef = collection(db, "pending_lost_pets_db");
        const q = query(petsRef, orderBy('CreatedAt', 'asc'), limit(2));

        const petsFon = collection(db, "pending_found_pets_db");
        const que = query(petsFon, orderBy('CreatedAt', 'asc'), limit(1));

        const unsubscribeLostPets = onSnapshot(q, (snapshot) => {
          const pets: PendingRequest[] = snapshot.docs.map((doc) => {
            return {...doc.data() as PendingRequest};
          });
          setPendingRequests((prev) => [...pets, ...prev]);
        });

        const unsubscribeFoundPets = onSnapshot(que, (snapshot) => {
          const pets: PendingRequest[] = snapshot.docs.map((doc) => {
            return {...doc.data() as PendingRequest};
          });
          setPendingRequests((prev) => [...prev, ...pets]);
        });

        return () => {
          unsubscribeLostPets();
          unsubscribeFoundPets();
        };
        
      } catch (error) {
        console.error("Error fetching pending lost pets:", error);
      }
    };

    const fetchData = async() => {
      let list: User[] = [];
      try {
        const querySnapshot = await getDocs(collection(db, "user_profile"));
        const oneMonthAgo = Timestamp.fromMillis(Date.now() - 30 * 24 * 60 * 60 * 1000);

        querySnapshot.forEach((doc) => {
          const userData = doc.data() as User ;
          list.push({...userData});
        });

        const activeUsersList = list.filter(user => {
          return user.lastLogin && user.lastLogin.toMillis() >= oneMonthAgo.toMillis();
        });

        const nonActiveUsersList = list.filter(user => {
          return !user.lastLogin || user.lastLogin.toMillis() < oneMonthAgo.toMillis();
        })
        
        setActiveUsers(activeUsersList.length);
        setNonActiveUsers(nonActiveUsersList.length);
        setTotalUsers(list.length);
      }
      catch (err) {
        console.log(err);
      }
    }


    useEffect(() => {
      fetchData();
      fetchInitialPets();
    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">

  {/* Top Row: Total Users, Active Users, Non-Active Users */}
  <div className="bg-blue-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-full h-[150px]">
    <h3 className="text-xl font-semibold mb-[15px]">Total Users</h3>
    <p className="text-3xl font-bold">{totalUsers}</p>
  </div>

  <div className="bg-green-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-full h-[150px]">
    <h3 className="text-xl font-semibold mb-[15px]">Active Users</h3>
    <p className="text-3xl font-bold">{activeUsers}</p>
  </div>

  <div className="bg-red-400 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-full h-[150px]">
    <h3 className="text-xl font-semibold mb-[15px]">Non-Active Users</h3>
    <p className="text-3xl font-bold">{nonActiveUsers}</p>
  </div>

  {/* Middle Row: Pending Requests */}
  <h3 className="text-xl font-bold mt-[15px] -mb-[10px]">Pending Requests</h3>
      <div className="md:col-span-3 bg-gray-300 text-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-[340px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px]">
          {pendingRequests.length > 0? (
            pendingRequests.map((request) => (
              <PetBox key={request.DocumentId} pet={request} />
            ))
          ) : (
            <p className="text-black ">No pending requests...</p>
          )}
        </div>
      </div>

  {/* Bottom Row: Recent Feedback */}
  <h3 className="text-xl font-bold mt-[15px] -mb-[10px]">Recent Feedback</h3>
  <div className="md:col-span-3 bg-gray-300 text-black p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-full h-[300px]">
    <p className="text-lg">No feedback yet...</p>
  </div>

</div>
  );
};

export default UserStats;
