import mongoose from "mongoose";
let connection;
if (process.env.NODE_ENV === "development") {
  if (!global.connection) global.connection = {};
  connection = global.connection;
} else {
  connection = {};
}

async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  // Use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
