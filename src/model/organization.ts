import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Organization = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    imagePath: {
        type: String
    },
})

export default mongoose.model('Organization', Organization, 'organizations');