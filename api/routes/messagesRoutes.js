import express from "express"
import { protectRoute } from "../middleware/auth.js"
import { getConversations, sendMessage } from "../controllers/messageController.js"

const router = express.Router()

router.use(protectRoute)

router.post("/send", protectRoute, sendMessage)
router.get("/get", protectRoute, getConversations)

export default router