import ProductModel from "../mongodb/models/Product.model.js";
import ProductStatModel from "../mongodb/models/ProductStat.model.js";
import UserModel from "../mongodb/models/User.model.js";
import TransactionModel from "../mongodb/models/Transaction.model.js";
import getCountryIso3 from 'country-iso-2-to-3';
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    const productStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStatModel.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productStats);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({ message: error.message });
  }
};
export const getCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({ role: "user" }).select(
      "-password"
    );
    res.status(200).json(customers);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = "null", search = "" } = req.query;
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const transactions = await TransactionModel.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
      const total = await TransactionModel.countDocuments({
       // name: { $regex: search, $options: "i" },
      });
      console.log("Totals",total);
      res.status(200).json({
        transactions,
        total
      })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async(req,res)=> {
  try {
    const users = await UserModel.find();
    const mappedLocations = users.reduce((acc,{country})=>{
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]){
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    },{})
    const formattedLocation = Object.entries(mappedLocations).map(([country,count])=>{
      return {id: country, value: count}
    })
    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}