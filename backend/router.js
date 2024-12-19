import { Router } from "express";
import * as user from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/home").get(Auth,user.home); //  http://localhost:3000/api/home  
router.route("/profile").get(Auth,user.profile); //  http://localhost:3000/api/profile  
router.route("/verifyemail").post(user.verifyEmail); //  http://localhost:3000/api/verifyemail  (input:email)
router.route("/signup").post(user.signUp);     //  http://localhost:3000/api/signup  (input:email,username,password,cpassword)
router.route("/signin").post(user.signIn);     //  http://localhost:3000/api/signin  (input:email,password)
router.route("/edituser").post(Auth,user.editUser);
router.route("/addpost").post(user.addPost);
router.route("/getpost").get(Auth,user.getPost);
router.route("/getposts").get(user.getPosts);
router.route("/postdetails/:_id").get(Auth,user.postDetails);
router.route('/addlike').post(Auth,user.addLike);
router.route('/ser').delete(user.ser);

export default router;