const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");
const blogRoute = require("./blogRoute");

router.get("/", function (req, res) {
  res.send("it works :)");
});

router.use("/blogs", blogRoute);

router.use(errorHandler);

module.exports = router;
