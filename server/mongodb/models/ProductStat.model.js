import {Schema,model} from 'mongoose';


const ProductStatSchema = new Schema({
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number
        }
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number
        }
    ]
},
{
    timestamps: true
})

const ProductStatModel = model('ProductStat',ProductStatSchema);

export default ProductStatModel;