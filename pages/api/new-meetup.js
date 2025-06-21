//api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
    const client= await MongoClient.connect('mongodb+srv://ajay1651:acsbjwK3KcNte8li@cluster0.sg2ydfa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db=client.db();
  const meetupsCollection=db.collection('meetups');
   const result =await meetupsCollection.insertOne(data);
   console.log(result);
   client.close();
   res.status(201).json({message:'Meetup inserted!'});
  }catch (error) {
      console.error("API Error:", error); // This will print the real issue
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

}
export default handler;
