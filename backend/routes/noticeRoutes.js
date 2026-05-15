const express =
  require("express");

const router =
  express.Router();

const {
  createNotice,
  getNotices,
  deleteNotice,
} = require(
  "../controllers/noticeController"
);



// ========================
// CREATE NOTICE
// ========================
router.post(
  "/create",
  createNotice
);



// ========================
// GET ALL NOTICES
// ========================
router.get(
  "/all",
  getNotices
);



// ========================
// DELETE NOTICE
// ========================
router.delete(
  "/delete/:id",
  deleteNotice
);

module.exports = router;