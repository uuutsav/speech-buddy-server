import express from 'express';
const app = express();
import dotenv from 'dotenv'
import multer from 'multer';
import textRoutes from './routes/textRoutes.mjs'

dotenv.config();
app.use(express.json());

const port = 5000;

// Configure Multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/api/text', textRoutes)
app.use('/api/audio', audioRoutes)

app.listen(port, () => {
  console.log("Server started at port: " + port);
});