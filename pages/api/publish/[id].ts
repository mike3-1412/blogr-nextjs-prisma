import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);
  if (!session) {
    console.log("No session found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const postId = req.query.id;
  console.log("Post ID:", postId);

  // Check if the post exists and belongs to the user
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      author: { select: { email: true } },
    },
  });
  console.log("Post found:", post);

  if (!post) {
    console.log("Post not found");
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.author.email !== session.user.email) {
    console.log(
      "Forbidden: post author",
      post.author.email,
      "session user",
      session.user.email,
    );
    return res.status(403).json({ error: "Forbidden" });
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  res.status(200).json({ message: "Post published successfully" });
}
