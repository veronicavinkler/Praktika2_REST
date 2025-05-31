const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const tagController = require("../controllers/tag.controller");
const { body, param } = require("express-validator");
const validateRequest = require("../middleware/validationResult");

// 1 Get all tags (for a book)
router.get("/books/:bookid/tags", tagController.getAllTags);

// 2 Get a single tag by ID
router.get(
  "/tags/:id",
  [
    param("id").isInt().withMessage("Sildi ID peab olema täisarv"),
    validateRequest,
  ],
  tagController.getTagById
);

// 3 Create a new tag (Ainult adminid)
router.post(
  "/tags",
  authJwt.verifyToken,
  authJwt.isAdmin,
  [
    body("tag_name").notEmpty().withMessage("Sildi nimi on kohustuslik"),
    validateRequest,
  ],
  tagController.createTag
);

// 4 Update a tag by ID (Ainult adminid)
router.put(
  "/tags/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  [
    param("id").isInt().withMessage("Sildi ID peab olema täisarv"),
    body("tag_name").notEmpty().withMessage("Sildi nimi on kohustuslik"),
    validateRequest,
  ],
  tagController.updateTag
);

// 5 Delete a tag by ID (Ainult adminid)
router.delete(
  "/tags/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  [
    param("id").isInt().withMessage("Sildi ID peab olema täisarv"),
    validateRequest,
  ],
  tagController.deleteTag
);

module.exports = router;