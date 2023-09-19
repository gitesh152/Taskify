import mongoose from 'mongoose'

//connect to mongodb database
const db = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected : ${con.connection.host}`)
    }
    catch (error) {
        console.log(`Error :`, error.message)
        process.exit()
    }
}

export default db;