const Author = require("../models/author.model");

// 1 Get all authors
exports.getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
};


// 2 Get a single author by ID
exports.getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Autorit ei leitud" }); // 🇪🇪
        }
        res.status(200).json(author);
    } catch (err) {
        next(err); // ✅ Edasta viga edasi
    }
};

// 3 Create a new author
exports.createAuthor = async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
};

// 4 Update an author by ID
exports.updateAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Autorit ei leitud" });
        }
        const updatedAuthor = await author.update(req.body);
        res.status(200).json(updatedAuthor);
    } catch (err) {
        next(err);
    }
};

// 5 Delete an author by ID
exports.deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Autorit ei leitud" });
        }
        await author.destroy();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

