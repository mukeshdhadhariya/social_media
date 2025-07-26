import {Router} from "express"
import { editprofile, GetProfile, login, logout, register,getSuggestedUser, followOrUnfollow } from "../controllers/user.controller.js"
import {jwtVerify} from "../middleware/auth.mddleware.js"
import {upload} from "../middleware/multer.middleware.js"

const router=Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(jwtVerify,logout)//
router.route("/:id/profile").get(jwtVerify,GetProfile)
router.route("/profile/edit").post(jwtVerify,upload.single("profilePhoto"),editprofile)
router.route('/suggested').get(jwtVerify, getSuggestedUser);
router.route('/followorunfollow/:id').post(jwtVerify, followOrUnfollow);

export default router