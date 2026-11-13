import { prisma } from "../lib/prisma.js";

class Comment {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // get comment
  async getCommentById(commentId, postId, userId) {
    return this.prisma.comment.findFirst({
      where: { id: commentId, postId, userId, deletedAt: null },
    });
  }

  // get all the comments of a user
  async getComments(userId) {
    return this.prisma.comment.findFirst({
      where: { userId, deletedAt: null },
    });
  }

  // add a comment to a post
  async addComment(userId, postId, content) {
    return this.prisma.comment.create({
      data: { userId, postId, content },
    });
  }

  // edit a comment on a post
  async ediComment(commentId, userId, postId, newComment) {
    const comment = await this.getCommentById(commentId, postId, userId);

    if (!comment) {
      throw new Error("Comment not found, or has been deleted!");
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content: newComment },
    });
  }

  // delete a comment from a post
  async removeComment(commentId, userId, postId) {
    const comment = await this.getCommentById(commentId, postId, userId);

    if (!comment) {
      throw new Error("Comment not found, or has been deleted!");
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}

export const comments = new Comment(prisma);
