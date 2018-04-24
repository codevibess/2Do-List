const mongoose = require('mongoose');
    Schema = mongoose.Schema;

//create a schema
const todoSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String
});

//middlware which make sure that slug is created from name
todoSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});


//create the model
const todoModel = mongoose.model('ToDo', todoSchema);

//export the model
module.exports = todoModel;



function slugify(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
