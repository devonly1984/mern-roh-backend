import UserModel from '../mongodb/models/User.model.js';
export const getUser = async(req,res)=> {
    const {id} = req.params;
try {
    const user = await UserModel.findById(id);
    if (user) {
        res.status(200).json(user);
    }
} catch (error) {
    res.status(404).json({message: error.message})
}
}