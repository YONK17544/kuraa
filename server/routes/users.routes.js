import express from "express";
import { getUser, getUserFriends, addRemoveFriend, } from "../controllers/users.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

//READ

router.get("/:id", authMiddleware, getUser);
router.get("/:id/friends", authMiddleware, getUserFriends);

//UPDATE

router.patch("/:id/:friendId", authMiddleware, addRemoveFriend);

export default router;