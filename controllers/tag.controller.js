// controllers/tag.controller.js
const Tag = require("../models/tag.model");

// 1 Get all tags
exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};


// 2 Get a single tag by ID
exports.getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.tagid);
    if (!tag){
      return res.status(404).json({ message: "Silt ei leitud" });
    }
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};


// 3 Create a new atag
exports.createTag = async (req, res, next) => {
  try {
    const newTag = await Tag.create(tagData);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};


// 4 Update a tag by ID
exports.updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Silt ei leitud" });
    }
    const updatedTag = await tag.update(req.body);
    res.status(200).json(updatedTag);
  } catch (error) {
    next(error);
  }
};


// 5 Delete a tag by ID
exports.deleteTag = async (res, req, next) => {
  try {
    const tag = await Tag.findByPk(res.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Silt ei leitud" });
    }
    await tag.destroy();
    res.status(204).send();
  } catch (error){
    next(error);
  }
};

