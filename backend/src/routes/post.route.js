import {Router} from "express"
import {jwtVerify} from "../middleware/auth.mddleware.js"
import {upload} from "../middleware/multer.middleware.js"
import {addComment, addnewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost} from "../controllers/post.controller.js"

const router=Router()

router.route("/addpost").post(jwtVerify, upload.single('image'), addnewPost);
router.route("/all").get(jwtVerify,getAllPost);
router.route("/userpost/all").get(jwtVerify, getUserPost);
router.route("/:id/like").get(jwtVerify, likePost);
router.route("/:id/dislike").get(jwtVerify, dislikePost);
router.route("/:id/comment").post(jwtVerify, addComment); 
router.route("/:id/comment/all").post(jwtVerify, getCommentsOfPost);
router.route("/delete/:id").delete(jwtVerify, deletePost);
router.route("/:id/bookmark").get(jwtVerify, bookmarkPost);

export default router;