import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
    {
        slug: {
            type: String,
        },
        rating: {
            type: Object,
            default: {
                totalRatings: 10,
                totalTurns: 1,
            },
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Rating', RatingSchema);
