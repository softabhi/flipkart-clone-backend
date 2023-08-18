import mongoose from "mongoose";
// import cors from 'cors'
// import express from "express";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
const DB = process.env.DATABASE

const conectDb = ()=>{
    const conn = mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("database connected")).catch((err) => console.log(err))
}

export default conectDb;


// app.listen(4000, () => {
//     console.log("new database successfully connected");
// })