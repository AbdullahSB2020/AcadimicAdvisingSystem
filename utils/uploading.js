const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '../public/uploads',
    filename: function(req,file,cb){
        cb(null,`${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
//               \/ modify here for different size
const sizeLimit = 1 * 1024 * 1024; // 1MB

const upload = multer({
    storage: storage,
    limits: {fileSize: sizeLimit},
    fileFilter: function(req,file,cb){

    }
}).single('attachment') // << name of the input file in the html

// module.exports = upload ;