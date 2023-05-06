import UserModel from "../mongodb/models/User.model.js";
import OverallStatModel from "../mongodb/models/OverallStat.model.js";
import TransactionModel from "../mongodb/models/Transaction.model.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";
    const transactions = await TransactionModel.find()
      .limit(50)
      .sort({ createdOn: -1 });
    const overallStat = await OverallStatModel.find({ year: currentYear });
    const {
      monthlyData,
      salesByCategory,
    } = overallStat;
    
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return (date = currentDay);
    });

    res.status(200).json({
      overallStat,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
