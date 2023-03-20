
import users from "../models/product";
import joi from "joi";


const productSchema = joi.object({
    name:joi.string().required(),
    price:joi.number().required(),
    desc:joi.string()

})
export const getAll = async (req, res) => {
    try {
        const data = await users.find();
        if(data.length == 0){
            return res.status(404).json({
                message:"Không có sản phẩm"
            })
        }
        res.status(200).json({
            message:"Gọi thành công",
            data
        })
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}
export const create = async (req, res) => {
    try {
        const {error} = productSchema.validate(req.body);
        if(error){
            res.status(400).json({
                message:error.details[0].message
            });
        }
        const data = await users.create(req.body)
        if(!data){
            return res.status(400).json({
                message:"Thêm không thành công"
            })
        }
        return res.status(200).json({
            message:"Thêm thành công",
            data
        })
    } catch (error) {
        res.status(404).json({
            message:error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const data = await users.findByIdAndDelete(req.params.id);
        if(!data){
            res.status(400).json({
                message:"không có data"
            })
        }
        return res.status(200).json({
            message:"Xóa thành công",
            data
        })
    } catch (error) {
        return res.status(404).json({
            message:error
        })
    }
}
export const get = async (req, res) => {
    try {
        const data = await users.findById(req.params.id)
        if(!data){
            return res.status(400).json({
                message:"Không tìm thấy sản phẩm"
            })
        }
        return res.status(200).json({
            message:"đã lấy được sản phẩm",
            data
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const data = await users.findOneAndUpdate({ _id:req.params.id}, req.body, {
            new: true
        })
        if(!data){
            return res.status(400).json({
                message:"Cập nhập không thành công"
            })
        }
        return res.status(200).json({
            message:"Cập nhập thành công",
            data
        })
    } catch (error) {
        return res.status(404).json({
            message:error
        })
    }
}