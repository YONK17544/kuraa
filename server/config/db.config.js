import mongoose from "mongoose";

export const dbConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI
    const connection = await mongoose.connect(MONGO_URI, {
        usenewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('Mongodb connected', connection.connection.host)
}