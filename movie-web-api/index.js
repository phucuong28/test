import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors';
import movieListRoutes from './src/routes/movie-list-routes.js';

const app = express();
const port = process.env.PORT;

const connectDb = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.MONGO_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.log('Failed');
        });
};

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/movie-list', movieListRoutes);

app.listen(port, () => console.log('Server is running at port ' + port))