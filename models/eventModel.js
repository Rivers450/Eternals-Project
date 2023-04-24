const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating the event schema
const eventSchema = new Schema({
    category: {
        type: String, required: [true, 'Category is required'],
        enum: ['Homework', 'Work', 'Clubs', 'Outings', 'Other']
    },
    title: { type: String, required: [true, 'Title is required'] },
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    startTime: { type: String, requried: [true, 'Start Time is required'] },
    endTime: { type: String, required: [true, 'End Time is required'] },
    details: {
        type: String, requried: [true, 'Details are are required'],
        minLength: [10, 'The content should have at least 10 characters']
    },
    location: { type: String, required: [true, 'Location is Required'] },
    image: { type: String, required: [true, 'Image is Required'] }
},
    { timestamps: true })

module.exports = mongoose.model('Event', eventSchema);