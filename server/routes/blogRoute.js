const router = require("express").Router();
const BlogController = require("../controllers/BlogController");
const imageKit = require("../middlewares/imageKit");
const uploadImage = require("../middlewares/multer");

router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getBlogById);
router.post("/", uploadImage, imageKit, BlogController.createBlog);
router.put("/:id", uploadImage, imageKit, BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
