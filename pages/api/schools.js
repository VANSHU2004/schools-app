import { getDB } from "../../lib/db";

export default async function handler(req, res) {
  const db = await getDB();

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { name, address, city, state, contact, email_id, image } = body;
      if (!name || !email_id || !image || !address || !city || !state || !contact) {
        return res.status(400).json({ error: "All fields are required" });
      }
      // 🔹 Basic backend validations
        if (!/^[0-9]{10}$/.test(contact)) {
        return res.status(400).json({ error: "Contact must be a valid 10-digit number" });
        }

        if (!/^\S+@\S+\.\S+$/.test(email_id)) {
        return res.status(400).json({ error: "Invalid email format" });
        }

      await db.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      return res.status(201).json({ message: "School added successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
  }

  if (req.method === "GET") {
    try {
      const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch schools" });
    }
  }
}
