import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MNGDB_URL);
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;