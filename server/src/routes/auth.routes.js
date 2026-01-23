const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Logged-in user route
router.get("/me", protect, (req, res) => {
  res.json({ message: "User fetched ✅", user: req.user });
});

module.exports = router;
