require('dotenv').config({ path: '.env.develop'});
const { MongoClient } = require('mongodb');
const mongoUrl = process.env.MONGO_URL;

const run = async () => {
  const mongoClient = new MongoClient(mongoUrl);
  try {
    const testDB = mongoClient.db("test");
    const usersCollection = testDB.collection("users-top-searches");
    await getName(usersCollection);
  } finally {
    await mongoClient.close();
  }
}

const recordUserSearch = async (userId, searchTag) => {
  const mongoClient = new MongoClient(mongoUrl);
  try {
    const database = mongoClient.db("test");
    const usersCollection = database.collection("users-top-searches");
    const query = { id: userId };
    const options = { upsert: true };
    const updateDoc = {
      $inc: {
        [searchTag]: 1
      }
    }
    const result = await usersCollection.updateOne(query, updateDoc, options);
    console.log(`${result.matchedCount} documents matched the query, updated ${result.modifiedCount} documents`);
  } catch(err){
    console.error(err);
  } finally {
    await mongoClient.close();
  }
} 

const getName = async (collection) => {
  try {
    const query = { name: "its_chaps" };
    const results = await collection.findOne(query);
    console.log("Results: ");
    console.log(results);
  } catch (err) {

  }

}

exports.run = run;
exports.recordUserSearch = recordUserSearch;
