import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default mongoose.model('Products', productSchema)