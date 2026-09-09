const multer = require("multer");
const path = require("path");
const DataUri = require("datauri/parser");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb)=>{
//         cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname).toLowerCase());
//     },

// });

const storage = multer.memoryStorage();

const imageUploads = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 }, //3mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supoorts the following filetypes" + fileTypes);
  },
}).single("image");

const dUri = new DataUri();

const dataUri = (req)=>{
    dUri.format(path.extname(req.file.originalname))
} 
