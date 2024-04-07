import { model, Schema } from "mongoose";

export const FoodSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        tags: {type: [String], required: true},
        image: {type: String, required: false},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },

        toObject: {
            virtuals: true,
        },
    }
);

export const FoodModel = model('food', FoodSchema);
