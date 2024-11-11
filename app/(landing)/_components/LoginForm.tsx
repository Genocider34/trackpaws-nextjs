import React, { useEffect, useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsClosing(true);
        setTimeout  (() => {
            onClose();
        }, 400);
    };

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
                        <img
                            src="/images/admin_icon.png"
                            alt="Profile Icon"
                            className="w-[100px] h-[100px] opacity-100"
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mt-4">
                        LOGIN
                    </button>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                        <label>
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a>
                    </div>
                </form>
                <center>
                    <button onClick={handleSubmit} className="mt-4 text-sm text-gray-600 hover:text-blue-500">
                        Cancel
                    </button>
                </center>
            </div>
        </div>
    </div>
    );
};

export default LoginForm;