const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

require("dotenv").config();

app.use(express.static("public"));

app.get("/api/data", (req, res) => {
  const dataPath = path.join(__dirname, "data.json");
  fs.readFile(dataPath, "utf8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture du fichier JSON." });
    }
    try {
      const data = JSON.parse(jsonData);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Fichier JSON invalide." });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("IZA-MIRRORS backend prêt sur le port", PORT);
});
