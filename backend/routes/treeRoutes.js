const express = require("express");
const router = express.Router();
const {
  getAllTrees,
  getTree,
  getTreeSearch,
  getClosestTrees,
  setTree,
  setTreeFromCsv,
  updateTree,
  deleteTree,
} = require("../controllers/treeController");
const { protect } = require("../middleware/authMiddleware");

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

router.route("/nearby").get(protect, getClosestTrees);

// GET tree by ID, PUT update tree, DELETE tree
router.route("/:id").get(getTree).put(updateTree).delete(deleteTree);

router.route("/import").post(setTreeFromCsv);

module.exports = router;
