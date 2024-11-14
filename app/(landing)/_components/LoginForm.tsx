import React, { useEffect, useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth, db } from '../functions/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import Image from 'next/image';

interface LoginFormProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingButton(true);

        try {
            if (rememberMe) {
                await setPersistence(auth, browserLocalPersistence);
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            }
            else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const userRef = doc(db, 'user_profile', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                if(userData.isAdmin) {
                    setError(null);
                    
                    await updateDoc(userRef, {
                        lastLogin: Timestamp.now()
                    });

                    onLoginSuccess();
                }
                else {
                    setError("You don't have admin privileges.");
                }
            }
            else {
                setError("User not found!");
            }
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
        finally {
            setIsLoadingButton(false);
        }
    };

    const handleCloseButton = () => {
        setIsClosing(true);
        setTimeout  (() => {
            onClose();
        }, 400);
    }

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsClosing(false);
            }, 400);
        }
    }, [isClosing]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className={`relative bg-white p-8 rounded-lg w-[450px] shadow-xl ${isClosing? 'animate-fade-out-down' : 'animate-fade-in-up'}`}>
            {/* Title box on top */}
            <div className="absolute -top-7 left-20 right-20 bg-blue-500 text-white rounded-md p-4 text-center z-10">
                <h2 className="text-2xl font-bold">SIGN IN</h2>
            </div>

            {/* Form content */}
            <div className="mt-16">
                <div className="text-center mb-4 -mt-10">
                    <center>
                        <Image
                            src="/images/admin_icon.png"
                            alt="Profile Icon"
                            width={100}
                            height={100}
                            className="opacity-100"
                        />
                    </center>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className={`w-full text-white py-2 rounded-md mt-4 ${isLoadingButton ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-[#3B82F6]/90 cursor-pointer'}`}
                        disabled={isLoadingButton}
                    >
                        {isLoadingButton ? (<div className='flex justify-center items-center'>
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                            </div>) : 
                            ('LOGIN')
                        }
                    </button>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                        <label>
                            <input type="checkbox" className="mr-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/> Remember me
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a>
                    </div>
                </form>
                <center>
                    <button onClick={handleCloseButton} className="mt-4 text-sm text-gray-600 hover:text-blue-500">
                        Cancel
                    </button>
                </center>

                {/*Error Handling*/}
                {error && <div className='text-red-500 text-center mt-1 -mb-5 text-sm'>{error}</div>}
            </div>
        </div>
    </div>
    );
};

export default LoginForm;