const ProductModel = require('../models/productModel');
const getAllProducts = require('../helpers/getAllProducts');

const allProducts = async(req, res) => {

    try {

        // Check if "?q=value" has a value to start search in multiple fields "title" and "description"
        if (req.query.q || req.query.limit) 
        {
            // Convert "q" query to regex and insensitive useing "i" flag
            let qRegex = new RegExp(req.query.q, "i");


            // Start search in database
            const productsFind = await ProductModel.find()
                .where("price")
                .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
                .lte(req.query.max || 100000) // if "req.query.max" is empty set a big number as max value
                .limit( !req.query.limit ? 10 : parseInt( (req.query.limit * req.query.page) ) )
                .skip( !req.query.limit ? 0 : ( ( parseInt(req.query.page) - 1) * req.query.limit ) ) // search in title or description
                .or([ { title: qRegex }, { description: qRegex } ]);


                let totalProducts = await ProductModel.countDocuments({});    
                let totalPages = Math.ceil( ( totalProducts / req.query.limit ) );

                let data = {
                    totalProducts: totalProducts,
                    totalPages, // total products/limit
                    previewPage: req.query.page == 1 ? false : ( parseInt( req.query.page ) - 1 ), 
                    currentPage: parseInt( req.query.page ),
                    nextPage: req.query.page == totalPages ? false : ( parseInt( req.query.page ) + 1 ),
                    products: productsFind,
                }


            // Show success message with data of products and total of products
            res.status(200).json({ success: true, data });
        }

        // Check if ":category" and "?q=value" has a value to start search by category in multiple field "title" and "description"
        else if (req.params.category || req.query.q) 
        {
            // Convert ":category" param to regex and insensitive useing "i" flag
            let catRegex = new RegExp(req.params.category, "i");

            // Convert "q" query to regex and insensitive useing "i" flag
            let qRegex = new RegExp(req.query.q, "i");


            // Start search in database
            const productsFind = await ProductModel.find()
                .and([ { category: catRegex } ]) // select category
                .where("price")
                .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
                .lte(req.query.max || 100000) // if "req.query.max" is empty set a big number as max value
                .or([ { title: qRegex }, { description: qRegex } ]); // search in title or description


            // Show success message with data of products and total of products
            res.status(200).json({ success: true, total: productsFind.length, data: productsFind });
        }

        // Check if "?min=value&max=value" has a value
        else if (req.query.min || req.query.max) 
        {
            // Start filter product by price
            productsFiltered = await ProductModel.find()
            .where("price")
            .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
            .lte(req.query.max || 100000); // if "req.query.max" is empty set a big number as max value

            // Show success message and send data
            res.status(200).json({ success: true, total: productsFiltered.length, data: productsFiltered });
        }
        

        // In this case return all products
        else {
            // Get all products
            getAllProducts(res, ProductModel);
        }

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
    
}


const createProduct = async(req, res) => {
    
    // Get data from request body
    const { title, description, price, category, inStock } = req.body;

    try {

        // Add new product
        const newProduct = await ProductModel.create({
            title,
            description,
            price,
            category,
            inStock, 
        });
        
        // Show success message with data of new product
        res.status(200)
            .json({ success: true, message: "Your product has been saved", data: newProduct });

    } catch (error) {
        // Show error message if product not created
        res.status(500).json({ success: false, message: error.message });
    }
}


const updateProduct = async(req, res) => {

    // Get data from request body
    const { title, description, price, category, inStock } = req.body;

    try {
        
        // Find product by id and update
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price,
            category,
            inStock, 
        });

        // return success message
        res.status(200).json({ success: true, message: "Your product has been updated" });

    } catch (error) {

        // If an error return error message
        res.status(500).json({ success: false, message: error.message });
    }
}


const deleteProduct = async(req, res) => {

    try {

        // Find product by id and delete
        await ProductModel.findByIdAndDelete(req.params.id);
        
        // Return success message
        res.status(200).json({ success: true, message: "Your product has been deleted" });

    } catch (error) {

        // If an error return error message
        res.status(500).json({ success: false, message: error });
    }
}

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct
}