const express = require("express");
const router = express.Router();
const {
  getAllTrees,
  getTree,
  setTree,
  updateTree,
  deleteTree,
} = require("../controllers/treeController");

// GET all trees and POST new tree
router.route("/").get(getAllTrees).post(setTree);

// GET tree by ID, PUT update tree, DELETE tree
router.route("/:id").get(getTree).put(updateTree).delete(deleteTree);

module.exports = router;
