import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  console.log("Request method:", req.method);
  const { title, content } = req.body;
  console.log("Request body:", req.body);
  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);
  // Validate session and email
  if (!session || !session.user?.email) {
    console.log("Unauthorized - Please sign in");
    return res.status(401).json({ message: "Unauthorized - Please sign in" });
  }

  if (!title) {
    console.log("Title is required");
    return res.status(400).json({ message: "Title is required" });
  }
  console.log(
    "Creating post with title:",
    title,
    "and content:",
    content,
    "and author:",
    session.user.email,
  );
  try {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session.user.email } },
      },
    });
    console.log("Post created1:", result);
    res.json(result);
    console.log("Post created2:", result);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
}
