require('dotenv').config({ path: '.env.develop'});
const { MongoClient } = require('mongodb');
const mongoUrl = process.env.MONGO_URL;

const mongoClient = new MongoClient(mongoUrl);

const run = async () => {
  try {
    const testDB = mongoClient.db("test");
    const usersCollection = testDB.collection("users-top-searches");
    await getName(usersCollection);
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

run();

exports.run = run;
