import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    organizationID: {
        type: mongoose.Types.ObjectId
    },
    text: {
        type: String
    }
})

export default mongoose.model('Comment', Comment, 'comments');