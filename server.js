import app from "./src/app.js";
import { config } from "dotenv";
import connectToDB from "./src/config/database.js";

config();




app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

connectToDB();

