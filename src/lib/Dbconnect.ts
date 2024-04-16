import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};


const connection: ConnectionObject = {}
async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
      console.log("Already Connected to Database");
      return;
    }
    // Use new database connection
    
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
      connection.isConnected = (db.connection as any)[0].readyState;
      console.log("Db Connected Successfully");
    } catch (error) {
      console.error("Error in connecting to Database:", error);
      process.exit(1);
    }
  }
  
  


export default dbConnect;