const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a new schema
const rsvpSchema = new Schema({
    status: { type: String, enum: ['Yes', 'No', 'Maybe'], required: [true, "The status of the RSVP is required"] },
    host: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "The RSVP status is missing the host argument."] },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, "The RSVP status is missing the event argument."] }
})

module.exports = mongoose.model('rsvp', rsvpSchema);