import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
            id: String,
            cost: Number,
            category: String,
            name: String,
            brand: String,
            retail_price: Number,
            department: String,
            sku: String,
            distribution_center_id: String
})

const Produce = mongoose.model('Produce', produceSchema);
export default Produce;