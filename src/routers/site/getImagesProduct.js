const express = require("express")
const router = express.Router();
const fs = require("fs")
const path = require("path")

const IMAGE_DIR = path.join(__dirname,"..","libs", "Uploads", "images","products");
router.get("/api/v1/images/products/:imageName", (req, res) => {

    const imageName = req.params.imageName;
    const imagePath = path.join(IMAGE_DIR, imageName);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }

        res.sendFile(imagePath);
    });

})

module.exports = router;