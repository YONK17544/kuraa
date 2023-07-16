import express from 'express';
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createPost, getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post("/", authMiddleware, upload.single('photo'), createPost);
// write 'poster' in frontend

// READ
router.get("/", authMiddleware, getFeedPosts);

router.get("/:userId/posts", authMiddleware, getUserPosts)

//UPDATE
router.patch("/:id/like", authMiddleware, likePost);

export default router;