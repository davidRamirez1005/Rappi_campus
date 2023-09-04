
import dotenv from "dotenv";
import {MongoClient} from "mongodb"

dotenv.config("../src/");

// console.log(process.env.ATLAS_USER);
export async function con(){
    try {
        const URI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.b0o2rzg.mongodb.net/${process.env.ATLAS_DB}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(URI, options);
        return client.db()
    } catch (error) {
        return{status: 500, message: error};
    }
}
