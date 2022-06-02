const router = require('express').Router();
const { allProducts,
        createProduct, 
        updateProduct, 
        deleteProduct 
    } = require('../controllers/productsController');


router.get("/products/:category?", allProducts);

router.post("/product/add", createProduct);

router.put("/product/update/:id", updateProduct);

router.delete("/product/delete/:id", deleteProduct);


module.exports = router;