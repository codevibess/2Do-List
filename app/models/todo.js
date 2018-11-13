const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const todoSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  description: String
});


// make sure that the slug is created from the name
todoSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// create the model
const todoModel = mongoose.model('Todo', todoSchema);

// export the model
module.exports = todoModel;

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}