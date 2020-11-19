const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');


// ------------------------- setting up multer --------------------------

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        let userName = file.originalname.split('.')[0];
        cb(null, `${userName}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//               \/ for different sizes modify here
const sizeLimit = 1 * 1024 * 1024; // 1MB

const upload = multer({
    storage: storage
}).single('attachment');

// ----------------- finished multer set up -----------------------------

router.post('/', async (req, res) => {
    console.log(typeof upload)
    upload(req, res, (err) => {

        if (err) {
            console.log(err);
            res.end('no file');
        } else {
            if (req.file === undefined) {
                console.log("file is undefianed");
                res.end('file not specifed....');
            } else {
                console.log(req.file);
                req.body = req.body ;
                console.log(req.file.originalname);
                console.log(req.file.filename); // value of the filename is undefined
                res.end('file is ok');
            }
        }
    })
    
    res.redirect('../student.html');
})

module.exports = router;