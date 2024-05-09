import winston from "winston";
import path from "path";
import dotenv from "dotenv";

import { __dirname } from "../utils.js";

dotenv.config();

const customLevels ={
    levels:{
        fatal:0,
        error:1,
        warm:2,
        info:3,
        http:4,
        debug:5
    }
}


const devLogger = winston.createLogger({
    levels:customLevels.levels,
    transports:[
        new winston.transports.Console({level:"debug"})
    ]
});

const prodLogger = winston.createLogger({
    levels:customLevels.levels,
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename: path.join(__dirname, "/logs/errors.log"),level:"error"})
    ]
});

const currentEnv = process.env.NODE_ENV || "development";

export const addLogger = (req,res,next) =>{
    if(currentEnv === "development"){
        req.logger = devLogger;
        console.log("DEV")
    }else{
        req.logger = prodLogger;
        console.log("Prod")
    }
    req.logger.http(`${req.url} - method: ${req.method}`)
    next()
}