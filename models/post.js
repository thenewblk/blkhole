var mongoose = require( 'mongoose' );
var moment = require('moment');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
} 

var postSchema = mongoose.Schema({
    content    : {},
    name : String,
    slug : String,
    updated_date : String,
    updated_at : String,
    type : String,
    approved	 : Boolean,
    tags: [{ type: String, ref: 'Tag' }] ,
    channels: [{ type: String, ref: 'Channel' }] ,
    client: { type: String, ref: 'Client' } ,
    project: { type: String, ref: 'Project' } ,
});



postSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  this.updated_at = moment().format("M.D.YYYY");
  this.updated_date = moment().format();
  next();
});

module.exports = mongoose.model('Post', postSchema);
