import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, authOptions);

  // Validate session and email
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Unauthorized - Please sign in" });
  }

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session.user.email } },
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
}
