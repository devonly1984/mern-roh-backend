import { connect } from "mongoose";

const connectDB = async() => {
    try {
        await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
         );
         console.log("MONGODB Success")      
    } catch (error) {
        console.log(error.message)
    }
  
};



  export default connectDB;