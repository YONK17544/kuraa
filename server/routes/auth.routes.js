import express from "express";
import { login, register } from "../controllers/auth.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("photo"), register)
router.post("/login", login);

export default router;