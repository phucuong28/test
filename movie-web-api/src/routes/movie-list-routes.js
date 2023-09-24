import { Router } from 'express';
import { getAllMovieController, getAllNoFilterMovieController, getAllRatingController, ratingMovieController } from '../controllers/movie-list-controllers.js';

const router = Router();

router.get('/get-all', getAllMovieController);
router.get('/get-no-filter', getAllNoFilterMovieController);
router.get('/get-all-rating', getAllRatingController);
router.patch('/rating', ratingMovieController);

export default router;