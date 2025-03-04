const functions = require('@google-cloud/functions-framework');
    const express = require("express");
  const { Pool } = require("pg"); // PostgreSQL library

  const app = express();
  app.use(express.json()); // To parse JSON request bodies

  const pool = new Pool({
    user: 'mint420millions',
    host: '34.132.84.180',
    database: 'Mint420',
    password: 'Mint2025!',
    port: 5432, // default PostgreSQL port
  });
// Register an HTTP function withthe Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('mintHttp', (req, res) => {
    
    


  app.post("/verify", async (req, res) => {
    const { firstName, lastName, phone, ticketnumber, addprizecode, dutchiecustid } = req.body;

    try {
      const result = await pool.query("SELECT * FROM codes WHERE ticketnumber = $1", [ticketnumber]);
      if (result.rows.length > 0) {
        res.json({ used: true }); // Ticket number already exists
      } else {
        // Insert the new record into the database
        await pool.query(
          "INSERT INTO codes (firstName, lastName, phone, ticketnumber, addprizecode, dutchiecustid, createdAt) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
          [firstName, lastName, phone, ticketnumber, addprizecode, dutchiecustid]
        );
        res.json({ used: false });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    }
  });

// Export the Express app as a Cloud Function




  
  
  
  
  res.send('Hello World!');
});