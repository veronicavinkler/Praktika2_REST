// Import Models
const ActivityLog = require("../models/activityLog.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");
const Author = require("../models/author.model.js");
const Tag = require("../models/tag.model.js");
const Book = require("../models/book.model.js");

// Relations
// Autor-raamat suhe (1:Mitmele)
Author.hasMany(Book, {
  foreignKey: "author_id",
  onDelete: "SET NULL",
});
Book.belongsTo(Author, {
  as: "author",
  foreignKey: "author_id",
});

// Raamat-kommentaar suhe (1:Mitmele)
Book.hasMany(Comment, {
  as: "comments",
  foreignKey: "book_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Book, {
  as: "book",
  foreignKey: "book_id",
});
  


//Mudelite eksportimine
const models = {
  User: User,
  Book: Book,
  Comment: Comment,
  Author: Author,
  Tag: Tag,
  ArticleTag: ArticleTag,
};

  module.exports = models