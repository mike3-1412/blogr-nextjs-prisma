import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handle(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const postId = req.query.id;

  // Check if the post exists and belongs to the user
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      author: { select: { email: true } },
    },
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.author.email !== session.user.email) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const deletedPost = await prisma.post.delete({
    where: { id: postId },
  });

  res.json(deletedPost);
}
