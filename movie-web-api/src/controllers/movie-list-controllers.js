import MovieList from "../models/MovieList.js";
import Rating from "../models/Rating.js";

export const getAllMovieController = async (req, res) => {
    try {
        let { page, limit, search, type, category, country, year, chieurap, sort } = req.query;
        const queryFilters = {};

        if (search) {
            queryFilters.$or =
                [
                    { name: { $regex: search, $options: 'i' } },
                    { origin_name: { $regex: search, $options: 'i' } },
                ]
        }

        if (type) {
            queryFilters.type = type;
        }

        if (category) {
            queryFilters.category = category;
        }

        if (country) {
            queryFilters.country = country;
        }

        if (year) {
            queryFilters.year = year;
        }

        if (chieurap) {
            queryFilters.chieurap = chieurap;
        }

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const movies = await MovieList.find(queryFilters).sort(sort || {['modified.time']: -1}).skip(skip).limit(limit);
        const allMovies = await MovieList.find(queryFilters);

        res.status(200).json({ code: 200, message: 'Successfully', data: movies, allMovies });
    } catch (err) {
        console.log(err);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAllNoFilterMovieController = async (req, res) => {
    try {
        const allMovies = await MovieList.find({});
        const  random = Math.floor(Math.random() * 5)
        const newMovies = await MovieList.find({}).limit(5);
        const singleMovies = await MovieList.find({type: "single"}).limit(10);
        const seriesMovies = await MovieList.find({type: "series"}).limit(10);
        const randomMovies = await MovieList.find({}).skip(random).limit(10);

        res.status(200).json({ code: 200, message: 'Successfully', allMovies, newMovies, singleMovies, seriesMovies, randomMovies });
    } catch (err) {
        console.log(err);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAllRatingController = async (req, res) => {
    try {
        const allRatings = await Rating.find({});

        res.status(200).json({ code: 200, message: 'Successfully', allRatings });
    } catch (err) {
        console.log(err);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const ratingMovieController = async (req, res) => {
    try {
        const {movieSlug, rating} = req.body;
        await Rating.findOneAndUpdate({slug: movieSlug}, {
            rating: rating,
        })

        res.status(200).json({ code: 200, message: 'Successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};