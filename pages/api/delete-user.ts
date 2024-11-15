import { firebase } from '@/lib/firebase'; // Firebase Admin SDK
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    console.log('UID received for deletion:', uid);

    try {
        await firebase.auth().deleteUser(uid);
        res.status(200).json({ message: `User with UID ${uid} deleted successfully.` });
    } catch (error) {
        // Check if error is an instance of Error and handle accordingly
        if (error instanceof Error) {
            console.error('Error deleting user:', error.message);
            res.status(500).json({
                error: 'Failed to delete user.',
                details: error.message,
            });
        } else {
            // Handle non-Error objects gracefully
            console.error('Unknown error deleting user:', error);
            res.status(500).json({
                error: 'Failed to delete user.',
                details: 'An unknown error occurred.',
            });
        }
    }
}
