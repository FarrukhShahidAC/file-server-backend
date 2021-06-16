const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const config = require('../index');

const UPLOAD_FILES_DIR = config.UPLOAD_FILES_DIR

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + UPLOAD_FILES_DIR);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
