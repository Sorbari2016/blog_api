import { matchedData, validationResult } from "express-validator";
import { posts } from "../db/post";

// Create a post controller object
const postController = {
  // middleware to get all posts
  async getPosts(req, res, next) {
    const authorId = req.user.id;
    try {
      // get posts
      const allPosts = await posts.getPosts();

      return res.json(allPosts);
    } catch (error) {
      return next(error);
    }
  },

  // get deleted posts (trash)
  async getTrash(req, res, next) {
    const authorId = req.user.id;

    try {
      const deletedPosts = await posts.getDeletedPosts(authorId);
      return res.json(deletedPosts);
    } catch (error) {
      return next(error);
    }
  },

  // get a post
  async getPost(req, res, next) {
    const postId = parseInt(req.params["postId"]);
    const authorId = req.user.id;

    try {
      const post = await posts.getPostById(authorId, postId);

      if (!post) {
        throw new Error("Post not found!");
      }

      return res.json(post);
    } catch (error) {
      return next(error);
    }
  },

  // create a post
  async createPost(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const authorId = req.user.id;
    const { title, content } = matchedData(req);
    try {
      const newPost = await posts.addPost(authorId, title, content);
      return res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  },

  // publish a post
  async publishPost(req, res, next) {
    const authorId = req.user.id;
    const postId = parseInt(req.params["postId"]);

    try {
      const publishedPost = await posts.publishPost(authorId, postId);
      return res.status(201).json(this.publishPost);
    } catch (error) {
      return next(error);
    }
  },

  // unpublish a post
  async unpublishPost(req, res, next) {
    const authorId = req.user.id;
    const postId = parseInt(req.params["postId"]);

    try {
      const unpublishedPost = await posts.unpublishPost(authorId, postId);
      return res.status(201).json(unpublishedPost);
    } catch (error) {
      return next(error);
    }
  },

  // update a post
  async updatePost(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const update = matchedData(req);

    // update post
    const authorId = req.user.id;
    const postId = parseInt(req.params["postId"]);

    const updatedPost = await posts.editPost(authorId, postId, update);
    return res.status(201).json(updatedPost);
  },

  // delete a post
  async deletePost(req, res, next) {
    const authorId = req.user.id;
    const postId = parseInt(req.params["postId"]);

    const deletedPost = await posts.removePost(postId, authorId);
    return res.json(deletedPost);
  },
};

export default postController;
