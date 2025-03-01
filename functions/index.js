// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3tznwepOMkSWax1I4hipFMls0zBjxxTA",
  authDomain: "million-452321.firebaseapp.com",
  projectId: "million-452321",
  storageBucket: "million-452321.firebasestorage.app",
  messagingSenderId: "63968588877",
  appId: "1:63968588877:web:88c7f89b888cd130341804",
  measurementId: "G-SNRH1YK156"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);/* eslint-disable max-len */
const express = require("express");
const {Pool} = require("pg"); // PostgreSQL library

const app = express();
app.use(express.json()); // To parse JSON request bodies

const pool = new Pool({ /* your PostgreSQL connection details */ });


app.post("/verify", async (req, res) => {
  const {name, phone, code} = req.body;

  try {
    const result = await pool.query("SELECT * FROM codes WHERE code = $1", [code]);
    if (result.rows.length > 0) {
      res.json({used: true}); // Code already exists
    } else {
      // Insert the new code (and optionally name and phone) into the database:
      await pool.query("INSERT INTO codes (code, name, phone) VALUES ($1, $2, $3)", [code, name, phone]);
      res.json({used: false});
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({error: "Database error"});
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));

