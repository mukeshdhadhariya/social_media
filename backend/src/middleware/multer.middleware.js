// upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists
const dir = './public/temp';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage: storage })

// import multer from "multer";
// const upload = multer({
//     storage:multer.memoryStorage(),
// });
// export {upload};