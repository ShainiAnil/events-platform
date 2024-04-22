const categoryModel = require("../model/categoryModel");

const category= async (req, res) => {
    try {
        const categoriesList = await categoryModel.find().select("_id category");
        res.json(categoriesList);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const addCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const isExist = await categoryModel.findOne({category :category })
        if(!isExist){
            const data = await categoryModel.create({ category: category });
            res.json(data._id);
        }
        return res.status(400).json({
            message: "Category already exists",
          });
       
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const editCategory = async (req, res) => {
    try {
        const { _id, category } = req.body;
        const data = await categoryModel.findOneAndUpdate({ _id }, { category }, { new: true });
        res.json(data);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { _id } = req.body;
        const data = await categoryModel.findByIdAndDelete(_id);
        res.json(data._id);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

module.exports = { category, addCategory, editCategory, deleteCategory };