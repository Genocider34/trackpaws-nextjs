import admin from '@/lib/firebase'; // Firebase Admin SDK
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE")
  {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'UID is required' });
    }
  
    try {
      // Delete the user with Firebase Admin SDK
      const userRecord = await admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;
      
      await admin.firestore().collection('user_profile').doc(uid).delete();
      await admin.auth().deleteUser(uid);

      return res.status(200).json({ message: `User with UID: ${uid} and EMAIL: ${email} deleted successfully.` });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({
        error: `Failed to delete user. ${res.status}, ${res.statusMessage}`,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
  else {
    console.log(req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}