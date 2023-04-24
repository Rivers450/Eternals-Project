const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema(
    {
        status: { type: String, enum: ['Yes', 'No', 'Maybe'], required: [true, "RSVPing is required"] },
        host: { type: Schema.Types.ObjectId, required: [true, "RSVP is missing attendee argument."] },
        event: { type: Schema.Types.ObjectId, required: [true, "RSVP is missing event argument."] }
    }
)

module.exports = mongoose.model('rsvp', rsvpSchema);