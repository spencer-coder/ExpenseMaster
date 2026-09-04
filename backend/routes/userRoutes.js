const { Router } = require("express");
const {
  loginUser,
  registerUser,
  removeProfilePicture,
  updateUser,
  uploadProfilePicture,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/update", protect, updateUser);
router.post("/upload-profile-picture", protect, upload.single("profilePicture"), uploadProfilePicture);

router.post("/remove-profile-picture", protect, removeProfilePicture);

module.exports = { UserRouter: router };
