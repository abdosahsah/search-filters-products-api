const getAllProducts = async(res, productModel, category = null) => {

    if (category === null) 
    {
        // Get all products
        const products = await productModel.find({});
                
        // Show success message with data of products and total of products
        res.status(200).json({ success: true, total: products.length, data: products });
    }

    else {
        // Get all products by category
        const products = await productModel.find({ category });
                
        // Show success message with data of products and total of products
        res.status(200).json({ success: true, total: products.length, data: products });
    }
}

module.exports = getAllProducts;