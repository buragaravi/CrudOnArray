
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
configDotenv();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const db_name = process.env.MONGODB_DB || "demo";
const collection_name = process.env.MONGODB_COLLECTION || "users";


const StartFunc = async ({ inRequestBody }) => {
  let LocalReturnObject = { KTF: false };
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(db_name);
    const collection = db.collection(collection_name);

    // Optionally, you can add a pk field if needed, similar to file logic
    // For now, just insert the incoming data
    const result = await collection.insertOne(inRequestBody);

    if (result.insertedId) {
      LocalReturnObject.KTF = true;
      LocalReturnObject.SuccessText = `Inserted document with _id ${result.insertedId} into MongoDB successfully.`;
    } else {
      LocalReturnObject.KReason = "Insert failed.";
    }
  } catch (err) {
    LocalReturnObject.KReason = `Error inserting into MongoDB: ${err.message}`;
    console.error('Error:', err);
  } finally {
    await client.close();
  }

  return LocalReturnObject;
};

export { StartFunc };