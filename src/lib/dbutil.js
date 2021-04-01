import config from '../config.json';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Pool, Client } from 'pg';

dotenv.config();

export default class DbUtil {

    static getMongoConnection(){
        try {
            for (let db of config.databases) {
                if (db.name.toUpperCase() === "MONGODB"){
                    this.config = db.config;
                }
            }
            if (process.env.ENVIRONMENT === 'DEV'){
                return mongoose.connect('mongodb://'+this.config.host+':'+this.config.port+'/'+this.config.dbname, {useNewUrlParser: true,useUnifiedTopology: true } );

            }else{
                return mongoose.connect('mongodb+srv://'+  process.env.MONGO_DB_USER  +':'+  process.env.MONGO_DB_PASS  +'@'+ process.env.MONGO_DB_HOST +'/'+ process.env.MONGO_DB_DBNAME +'?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true  });
            }
           
        } catch (error) {
            console.log(error);
            return;
        }
        
    }

    static getPostgresConnection(){
        
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        return pool.connect();
    }
    

}
