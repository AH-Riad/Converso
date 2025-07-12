"use server";

import { getDbUserId } from "@/actions/user";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, imageUrl: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    const post = await prisma.post.create({
      data: {
        content,
        image: imageUrl,
        authorId: userId,
      },
    });
    revalidatePath("/"); //purge the cache for homepage
    return { success: true, post };
  } catch (error) {
    console.log("Failed to create post", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function getPosts() {
  try {
    const post = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                name: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.log("Error in getPosts", error);
    throw new Error("Failed to fetch posts");
  }
}
