import fs from "fs";
import cors from "cors";
import express from "express";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `./json/${filename}`;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
