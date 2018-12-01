//Module for interacting with our Post model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Post Schema for defining what to save in a document
const PostSchema = new Schema({
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false},
    title: {type: String, required: true},
    url: {type: String, required: true},
    summary: {type: String, required: true}
});

//Before saving the document into our database, we register middleware
//that gets triggered on every create/save call
PostSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
 
    if(!this.createdAt) {
        this.createdAt = now;
    }

    next();
})

module.exports = mongoose.model('Post', PostSchema)