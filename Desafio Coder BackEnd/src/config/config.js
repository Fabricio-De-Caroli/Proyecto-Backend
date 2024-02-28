import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const PERSISTENCE = process.env.PERSISTENCE

export const options ={
    server:{
        port: PORT,
        persistence:PERSISTENCE
    },
    mongo:{
        url:MONGO_URL
    }
};