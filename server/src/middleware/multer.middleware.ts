import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage
});

export default upload;
