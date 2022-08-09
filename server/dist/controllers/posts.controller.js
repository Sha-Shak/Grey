"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.getOnePost = exports.deletePost = exports.updatePost = exports.createComment = exports.createPost = exports.getPosts = void 0;
const Posts = require("../models/postMessage.model.ts");
const Users = require('../models/user.model.ts');
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield Posts.find();
        return res.status(200).json(message);
    }
    catch (e) {
        res.status(500);
    }
});
exports.getPosts = getPosts;
// export const createPost = async (req,res)=>{
//   try{
//     const post = req.body;
//     if(req.anonId){
//       const postMessage = await Posts.create({...post, creator: req?.anonId})
//       res.status(201);
//       res.send(postMessage);
//     } else {
//       const postMessage = await Posts.create(post)
//       res.status(201);
//       res.send(postMessage);
//     }
//   } catch(e){
//     res.status(500);
//     console.log(e)
//   }
// }
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = req.body;
        if (req.anonId) {
            const postMessage = yield Posts.create(Object.assign(Object.assign({}, post), { creator: req === null || req === void 0 ? void 0 : req.anonId }));
            res.status(201);
            res.send(postMessage);
        }
        else {
            const postMessage = yield Posts.create(post);
            res.status(201);
            res.send(postMessage);
        }
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});
exports.createPost = createPost;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, postId } = req.body;
        const post = yield Posts.findById(postId);
        const user = yield Users.findById(req.userId);
        if (post && user) {
            post.comments.push({ id: postId, comment: comment, userId: user.name });
            const updatedPost = yield Posts.findByIdAndUpdate(postId, post, { new: true });
            res.status(201).send(updatedPost);
        }
        else {
            res.status(400).send('Post and User not found!');
        }
    }
    catch (e) {
        res.status(500);
    }
});
exports.createComment = createComment;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, message, creator, tag, selectedFile, likeCount } = req.body;
        const id = req.params.id;
        const post = yield Posts.findById(id);
        if (post) {
            post.title = title;
            post.message = message;
            post.tag = tag;
            post.selectedFile = selectedFile;
            post.save();
            res.status(200);
            res.send(post);
        }
        else {
            res.status(400).send("post not found");
        }
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});
exports.updatePost = updatePost;
// export const updatePost = async (req,res)=>{
//   try{
//     const {title, message, creator, tag, selectedFile, likeCount} = req.body;
//     const id = req.params.id;
//     const post = await Posts.findById(id)
//     if(post){
//     post.title = title;
//     post.message = message;
//     post.tag = tag;
//     post.selectedFile = selectedFile;
//     post.save();
//     res.status(200);
//     res.send(post);
//     } else {
//       res.status(400).send("post not found")
//     }
//   } catch(e){
//     res.status(500);
//     console.log(e)
//   }
// }
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield Posts.findByIdAndDelete(id);
        res.status(201);
        res.send("post deleted");
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});
exports.deletePost = deletePost;
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const post = yield Posts.findById(id);
        res.status(201);
        res.send(post);
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});
exports.getOnePost = getOnePost;
// export const likePost = async (req, res) => {
//     const { id } = req.params;
//     if(!req.userId) return res.json({message: "Unauthenticated"});
//     try{
//       const post = await Posts.findById(id);
//       if (post) { 
//         const index = post.likes.findIndex((id)=>  id === String(req.userId));
//         if(index === -1){
//             post.likes.push(req.userId)
//         } else {
//           post.likes = post.likes.filter(id=> id !== String(req.userId))
//         }
//         const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
//         res.status(201).send(updatedPost);
//       } else {
//         res.status(500).send('post not found');
//       }
//     }catch(e){
//       res.status(500)
//       console.log(e)
//     }
// }
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthenticated" });
    try {
        const post = yield Posts.findById(id);
        if (post) {
            const index = post.likes.findIndex((id) => id === String(req.userId));
            if (index === -1) {
                post.likes.push(req.userId);
            }
            else {
                post.likes = post.likes.filter(id => id !== String(req.userId));
            }
            const updatedPost = yield Posts.findByIdAndUpdate(id, post, { new: true });
            res.status(201).send(updatedPost);
        }
        else {
            res.status(500).send('post not found');
        }
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});
exports.likePost = likePost;
//# sourceMappingURL=posts.controller.js.map