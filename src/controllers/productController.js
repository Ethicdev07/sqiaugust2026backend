const AppError = require("../utils/AppError");
const Products = require("../models/Product");
const { validateCreateProduct } = require("../validation/productValidation");
const { dataUri } = require("../utils/multer");
const { uploader } = require("../utils/cloudinary")

//create new products

const createNewProduct = async (req, res, next) =>{
    try {

        if (!req.file) {
            throw new AppError("Please upload product image with field name product_image", 400);
        }

        const fileData = dataUri(req).content;
        const result = await uploader.upload(fileData, {
            folder: "Augustbackend/Product",
        });

       

        const userId = req.user._id;

        const validation = validateCreateProduct(req.body);

        if(validation.error){
            throw new AppError(validation.error.message, 400);
        };

        const { title, description, price} = req.body;

        const newProduct = await Products.create({
        
            title,
            description,
            price,
            user: userId,
            product_image: result.secure_url,
        });

        if(!newProduct){
            throw new AppError("An error occured while creating product", 404)
        };

        res.status(201).json({
            status: "successful",
            message: "Product created succesfully",
            data: {
                product: newProduct
            }
        })
        
    } catch (error) {
        next(error)
    }
};

//getallProducts

const getAllProducts = async(req, res, next)=>{
    try {
        const products = await Products.find().populate("user");

        res.status(200).json({
            status: "succesful",
            message: "All products fetched succesfully",
            result: products.length,
            data:{
                products
            }
        })
    } catch (error) {
        next(error)
    }
};

//getproductdetails

const getProductDetails = async(req, res, next)=>{
    try {
        const { id } = req.params;

        const product = await Products.findById(id);

        if(!product){
            throw new AppError("Product with specified id not found", 404)
        };

        res.status(200).json({
            status: "succesfull",
            message: "Product fetched successfully",
            data: {
                product
            }
        })
    } catch (error) {
        next(error)
    }
};

//updateproductdetails

const updateProductDetails = async(req, res, next)=>{
    try {
        const { id } = req.params;

        const updateDetails = req.body;

        console.log(updateDetails);
        

        if(!id){
            throw new AppError("Please provide id", 400)
        };

        const updatedProduct = await Products.findByIdAndUpdate(id, updateDetails, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            message: "Product updated succesfully",
            data: {
                product: updatedProduct,
            }
        })
    } catch (error) {
        next(error)
    }
};

//deleteproduct

const deleteProduct = async(req, res, next)=>{
    try {
        const { id } = req.params;

        
        if(!id){
            throw new AppError("Please provide id", 400)
        };
    
        await Products.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
            message: "Product deleted succesfully",
            data: null
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createNewProduct,
    getAllProducts,
    getProductDetails,
    updateProductDetails,
    deleteProduct
}