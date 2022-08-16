import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Program = new Schema({
    withBuddy: {
        type: Boolean
    },
    withCage: {
        type: Boolean
    },
    withAnimals: {
        type: Boolean
    },
    name: {
        type: String
    },
    organizationID: {
        type: mongoose.Types.ObjectId
    },
})

export default mongoose.model('Program', Program, 'programs');