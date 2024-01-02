import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 4001; // You can use any free port

app.use(cors());

app.get("/fetch-image", async (req, res) => {
	const imageUrl = req.query.url; // Get the image URL from query parameters
	if (!imageUrl) {
		return res.status(400).send("No URL provided");
	}

	try {
		const response = await fetch(imageUrl);
		const imageBuffer = await response.buffer();
		res.set("Content-Type", "image/jpeg"); // Set the content type to the image type
		res.send(imageBuffer);
	} catch (error) {
		console.error("Error fetching image:", error);
		res.status(500).send("Error fetching image");
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});