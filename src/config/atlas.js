/*import {MongoClient} from  'mongodb'
import dotenv from 'dotenv';

dotenv.config('../src/');
console.log(process.env.ATLAS_DB);
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.xuq9yaf.mongodb.net/${process.env.ATLAS_DB}`;
console.log(uri);
console.log("mongodb+srv://rappi:rappi123@cluster0.b0o2rzg.mongodb.net/");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
export async function con() {
    const client = new MongoClient(uri, options);
    try {
        await client.connect();
        const db = client.db();
        return db;
    } catch (error) {
        console.log(error);
        //throw new Error('Error al conectar a la base de datos: ' + error.message);
    }
}

*/
import dotenv from "dotenv";
import {MongoClient} from "mongodb"

dotenv.config("../src/");

console.log(process.env.ATLAS_USER);
export async function con(){
    try {
        const URI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.b0o2rzg.mongodb.net/${process.env.ATLAS_DB}`;
        console.log(URI);
        console.log("mongodb+srv://rappi:rappi123@cluster0.b0o2rzg.mongodb.net/");
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
