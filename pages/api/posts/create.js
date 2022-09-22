import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Please log in first" });
  const email = session.user.email;
  const { title, content } = req.body;
  console.log(content);
  try {
    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email,
          },
        },
      },
    });
    res.status(200).json({ message: "Post successfully created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
