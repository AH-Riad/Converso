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

export async function toggleLike(postId: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    //check  if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found!");
    if (!existingLike) {
      //unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      //like and create notification (only if liking someone else's post)
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        ...(post.authorId !== userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: post.authorId,
                  creatorId: userId,
                  postId,
                },
              }),
            ]
          : []),
      ]);
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function createComment(postId: string, content: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    if (!content.trim()) throw new Error("Comment cannot be empty");

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found!");

    //create comment and notification in a transaction

    const [comment] = await prisma.$transaction(async (tx) => {
      //Create comment first
      const newComment = await tx.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
      });

      //Create notification if the comment is not by the post author
      if (post.authorId !== userId) {
        await prisma.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId,
            creatorId: userId,
            postId,
            commentId: newComment.id, // Link the comment to the notification
          },
        });
      }
      return [newComment];
    });
    revalidatePath("/");
    return { success: true, comment: comment };
  } catch (error) {
    console.error("Failed to create comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
}
