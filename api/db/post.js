import { prisma } from "../lib/prisma.js";

class Post {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // to get a post that hasn't been deleted
  async getPostById(authorId, postId) {
    return this.prisma.post.findFirst({
      where: { id: postId, authorId, deletedAt: null },
      include: { comments: true },
    });
  }

  // get all posts
  async getPosts(authorId) {
    return this.prisma.post.findMany({
      where: { authorId, deletedAt: null },
      include: { comments: true },
      orderBy: { updatedAt: "desc" },
    });
  }

  // get posts of the same category
  async getPostsByCategory(authorId, categoryId) {
    return this.prisma.post.findMany({
      where: { authorId, categoryId },
    });
  }

  // add post
  async addPost(authorId, title, content, categoryId, published = false) {
    return this.prisma.post.create({
      data: {
        authorId,
        title,
        content,
        categoryId,
        published,
      },
    });
  }

  // edit post
  async editPost(authorId, postId, updateData) {
    const post = await this.getPostById(authorId, postId);

    if (!post) {
      throw new Error("Post not found!");
    }

    return this.prisma.post.update({
      where: { authorId, id: postId },
      data: updateData,
    });
  }

  // publish a post
  async publishPost(authorId, postId) {
    const post = await this.getPostById(authorId, postId);

    if (!post) {
      throw new Error("Post not found!");
    }

    return this.prisma.post.update({
      where: { authorId, id: postId },
      data: { published: true },
    });
  }

  async unpublishPost(authorId, postId) {
    const post = await this.getPostById(authorId, postId);

    if (!post) {
      throw new Error("Post not found!");
    }

    return this.prisma.post.update({
      where: { authorId, id: postId },
      data: { published: false },
    });
  }
  //  get deleted posts
  async getDeletedPosts(authorId) {
    return this.prisma.post.findMany({
      where: { authorId, deletedAt: { not: null } },
      include: { comments: true },
      orderBy: { deletedAt: "desc" },
    });
  }

  // delete a post
  async removePost(postId, authorId) {
    const post = await this.getPostById(authorId, postId);

    if (!post) {
      throw new Error("Post not found, or has been deleted!");
    }

    return this.prisma.post.delete({
      where: { id: postId },
    });
  }

  // CATEGORY
  // get category by id
  async getCategoryById(categoryId) {
    return this.prisma.category.findFirst({
      where: { id: categoryId },
    });
  }

  // create a post category
  async createCategory(name) {
    return this.prisma.category.create({
      data: { name },
    });
  }

  // rename a category
  async renameCategory(categoryId, newName) {
    const category = await this.getCategoryById(categoryId);

    if (!category) {
      throw new Error("Category doesnt exist!");
    }

    return this.prisma.category.update({
      where: { id: categoryId },
      data: { name: newName },
    });
  }

  // delete category
  async removeCategory(categoryId) {
    const category = await this.getCategoryById(categoryId);

    if (!category) {
      throw new Error("Category not found, or has been deleted!");
    }

    return this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}

export const posts = new Post(prisma);
