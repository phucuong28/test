import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieListSchema = new Schema(
    {
        modified: {
            type: Object,
        },
        name: {
            type: String,
        },
        slug: {
            type: String,
        },
        origin_name: {
            type: String,
        },
	    thumb_url: {
            type: String,
        },
	    poster_url: {
            type: String,
        },
	    year: {
            type: Number,
        },
        content: {
            type: String,
        },
        type: {
            type: String,
        },
        episode_current: {
            type: String,
        },
        lang: {
            type: String,
        },
        view: {
            type: Number,
        },
        category: {
            type: Array,
        },
        country: {
            type: Array,
        },
        chieurap: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('MovieList', MovieListSchema);
