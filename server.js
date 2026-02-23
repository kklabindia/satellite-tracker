import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.get("/track/:id", async (req, res) => {
    const satelliteId = req.params.id;

    try {
        const response = await axios.get(
            `https://api.wheretheiss.at/v1/satellites/${satelliteId}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch satellite data" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});