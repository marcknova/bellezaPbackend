const Product = require("../models/products");

const createProductWithImage = (fileName, productData) => {
  return new Promise((resolve, reject) => {
    Product.create({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      typeproduct: productData.typeproduct,
      img: fileName.image1,
      imghover: fileName.image2,
    })
      .then((product) => {
        console.log("Product created successfully:", product);
        resolve(product);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        reject(error);
      });
  });
};

module.exports = createProductWithImage;
