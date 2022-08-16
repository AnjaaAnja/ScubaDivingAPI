import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    sname: {
        type: String
    },
    lname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    experience: {
        type: Number
    },
    password: {
        type: String
    },
})

export default mongoose.model('User', User, 'users');