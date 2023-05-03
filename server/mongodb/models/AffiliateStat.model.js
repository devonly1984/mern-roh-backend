import {Schema,Types,model} from 'mongoose';


const AffiliateStatSchema = new Schema({
   userId: {type: Types.ObjectId, ref: "User"},
   affiliateSales: {
    type: [Types.ObjectId],
    ref: "Transaction"
   },
   
},
{
    timestamps: true
})

const AffiliateStatModel = model('AffiliateStat',AffiliateStatSchema);

export default AffiliateStatModel;