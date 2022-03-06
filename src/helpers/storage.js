const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

require("dotenv").config();

const serviceAccount = require("../../serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const db = getFirestore();
const bucket = getStorage().bucket();

module.exports = { db, bucket };
