import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Reservation = new Schema({
    userID: {
        type: mongoose.Types.ObjectId
    },
    organizationID: {
        type: mongoose.Types.ObjectId
    },
    date: {
        type: Date
    },
    programID: {
        type: mongoose.Types.ObjectId
    }
})

export default mongoose.model('Reservation', Reservation, 'reservations');