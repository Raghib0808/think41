import mongoose from 'mongoose';
import csv from 'csvtojson';
import Produce from '../Schema/produce.schema.js'; // adjust path if needed


const isValidProduct = (Produce) => {
    return (
        Produce.id &&
        !isNaN(Number(Produce.cost)) &&
        Produce.category &&
        Produce.name &&
        Produce.brand &&
        !isNaN(Number(Produce.retail_price)) &&
        Produce.department &&
        Produce.sku &&
        Produce.distribution_center_id
    );
};

const cleanProduct = (Produce) => {
    return {
        id: String(Produce.id).trim(),
        cost: parseFloat(Produce.cost),
        category: Produce.category.trim(),
        name: Produce.name.trim(),
        brand: Produce.brand.trim(),
        retail_price: parseFloat(Produce.retail_price),
        department: Produce.department.trim(),
        sku: Produce.sku.trim(),
        distribution_center_id: Produce.distribution_center_id.trim()
    };
};

const dbconnect = async () =>{
    try {

mongoose.connect('mongodb://localhost:27017/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    try {
        const products = await csv().fromFile('./products.csv');

        const validProducts = products
            .filter(isValidProduct)
            .map(cleanProduct);

        if (validProducts.length === 0) {
            console.log('No valid products found.');
        } else {
            const result = await Produce.insertMany(validProducts);
            console.log(`${result.length} valid products inserted.`);
        }

    } catch (err) {
        console.error('Error during import:', err);
    }
});
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default dbconnect;