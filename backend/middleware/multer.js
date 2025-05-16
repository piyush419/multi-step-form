import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const singleUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new Error('Only JPG/PNG files allowed'));
    }
    cb(null, true);
  }
}).single("profilePhoto");
