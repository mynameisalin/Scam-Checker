const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const db = new sqlite3.Database("./scam_database.db");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

db.run("CREATE TABLE IF NOT EXISTS scams (id INTEGER PRIMARY KEY, type TEXT, value TEXT)");

app.post("/check", (req, res) => {
    const { value, type } = req.body;

    if (!value || !type) {
        return res.status(400).json({ message: "Please provide a valid value and type (email/phone)." });
    }

    db.get("SELECT * FROM scams WHERE type = ? AND value = ?", [type, value], (err, row) => {
        

        if (row) {
            return res.json({ exists: true, message: "This is a potential scam." });
        } else {
            db.run("INSERT INTO scams (type, value) VALUES (?, ?)", [type, value], (err) => {
                
                
            });
            return res.json({ exists: false, message: "Added to the database." });
        }
    });
});

app.get("/entries", (req, res) => {
    db.all("SELECT * FROM scams", [], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error." });
        }
        res.json(rows);
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
