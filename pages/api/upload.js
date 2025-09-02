import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/schoolImages");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    // ✅ Handle case where files.image might be array or object
    let file = files.image;
    if (Array.isArray(file)) file = file[0];

    if (!file || !file.filepath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = path.basename(file.filepath);
    res.status(200).json({ filePath: `/schoolImages/${fileName}` });
  });
}
