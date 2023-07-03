const express = require("express");
const router = express.Router();
const {
  getAllTrees,
  getTree,
  getTreeSearch,
  setTree,
  updateTree,
  deleteTree,
} = require("../controllers/treeController");

// GET all trees, or apply search filters
router
  .route("/")
  .get((req, res, next) => {
    if (Object.keys(req.query).length > 0) {
      return getTreeSearch(req, res, next);
    } else {
      return getAllTrees(req, res, next);
    }
  })
  .post(setTree);

// GET tree by ID, PUT update tree, DELETE tree
router.route("/:id").get(getTree).put(updateTree).delete(deleteTree);

module.exports = router;
