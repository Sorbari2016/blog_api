import { prisma } from "../lib/prisma.js";

class User {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // get user by email address
  async getUserByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  // get user by id
  async getUserById(userId) {
    return this.prisma.user.firstFirst({
      where: { id: userId, deletedAt: null },
      include: { posts: true },
    });
  }

  // add a user
  async addUser(email, username, password, role) {
    return this.prisma.user.create({
      data: {
        email,
        username,
        role,
        password,
      },
      select: {
        id: true,
        emai: true,
        username: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async editUser(userId, username, email, password, role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { email, username, password, role },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(userId) {
    return this.prisma.user.delete({
      where: { id: userId, deletedAt: null },
    });
  }
}

export const users = new User(prisma);
