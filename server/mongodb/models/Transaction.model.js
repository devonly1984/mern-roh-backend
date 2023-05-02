import {Schema,model,Types} from 'mongoose';


const TransactionSchema = new Schema({
 userId: String,
 cost: String,
 products: {
    type: [Types.ObjectId],
    of: Number
 }
},
{
    timestamps: true
})



const TransactionModel = model('Transaction',TransactionSchema);
export default TransactionModel