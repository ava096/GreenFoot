const express = require("express");
const router = express.Router();
const {
  getAllTrees,
  getTree,
  getUserTree,
  getTreeSearch,
  setTree,
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
  .post(protect, setTree);

// GET tree by ID, PUT update tree, DELETE tree
router
  .route("/:id")
  .get(getTree)
  .put(protect, updateTree)
  .delete(protect, deleteTree);

router.route("/userTrees").get(protect, getUserTree);

module.exports = router;
