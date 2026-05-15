const Notice =
  require("../models/Notice");



// ============================
// CREATE NOTICE
// ============================
exports.createNotice =
  async (req, res) => {

    try {

      const {
        title,
        message,
        postedBy,
        role,
      } = req.body;

      const notice =
        await Notice.create({
          title,
          message,
          postedBy,
          role,
        });

      res.status(201).json({
        success: true,
        message:
          "Notice Created",
        notice,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };



// ============================
// GET ALL NOTICES
// ============================
exports.getNotices =
  async (req, res) => {

    try {

      const notices =
        await Notice.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        notices,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };



// ============================
// DELETE NOTICE
// ============================
exports.deleteNotice =
  async (req, res) => {

    try {

      await Notice.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Notice Deleted",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };