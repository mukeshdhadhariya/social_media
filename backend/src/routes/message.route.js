import {Router} from "express"
import {jwtVerify} from "../middleware/auth.mddleware.js"
import {upload} from "../middleware/multer.middleware.js"
import { sendMessage,getMessage } from "../controllers/message.controller.js"

const router=Router()

router.route('/send/:id').post(jwtVerify, sendMessage);
router.route('/all/:id').get(jwtVerify, getMessage);
 
export default router;