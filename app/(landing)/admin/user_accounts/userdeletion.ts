import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({error: 'User ID is required'});
    }

    try {
      await admin.auth().deleteUser(userId);
      return res.status(200).json({message: `User with ${userId} has been deleted.`});
    }
    catch (err) {
      return res.status(500).json({error: 'Failed to delete user.'});
    }
  }
  else {
    return res.status(405).json({error: 'Method Not Allowed'});
  }
}