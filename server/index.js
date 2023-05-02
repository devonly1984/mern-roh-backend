import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.routes.js';
import managementRoutes from './routes/management.routes.js';
import salesRoutes from './routes/sales.routes.js';
import generalRoutes from './routes/general.routes.js';
import connectDB from './mongodb/database.config.js';

dotenv.config();
const app = express();
//middleware

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
//routes
app.use('/client',clientRoutes);
app.use('/general',generalRoutes);
app.use('/management',managementRoutes);
app.use('/sales',salesRoutes);

const PORT=5001 || process.env.PORT;
const startServer =  ()=> {
    app.listen(PORT,()=>{
        connectDB();
        //UserModel.insertMany(dataUser);
        //ProductModel.insertMany(dataProduct);
        //ProductStatModel.insertMany(dataProductStat);
        //TransactionModel.insertMany(dataTransaction)
        console.log(`Server started on ${PORT}`)
    })
}
startServer()