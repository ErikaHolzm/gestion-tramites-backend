// TODO: Esquema documento Status
import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

//...


export default mongoose.model('Status', statusSchema);