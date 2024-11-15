import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

export const firebase = admin.apps.length ? admin.app() : admin.initializeApp({credential: serviceAccount,
    databaseURL: "https://trackpaws-608c0-default-rtdb.asia-southeast1.firebasedatabase.app",
});
