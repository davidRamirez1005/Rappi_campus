
import dotenv from "dotenv";
import {MongoClient} from "mongodb"

dotenv.config("../src/");

// console.log(process.env.ATLAS_USER);
export async function con(){
    try {
        const URI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.b0o2rzg.mongodb.net/${process.env.ATLAS_DB}`;
        // console.log(URI);
        // console.log("mongodb+srv://rappi:rappi123@cluster0.b0o2rzg.mongodb.net/");
        //const URI =" mongodb+srv://C-jimenez21:admin21@cluster0.qbqr4gp.mongodb.net/DB_BODEGAS_V1"
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
