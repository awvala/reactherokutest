const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const articleSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  date: {
      type: String,
  }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;
