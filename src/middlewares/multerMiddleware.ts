import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Set destination for file uploads
export default upload;
