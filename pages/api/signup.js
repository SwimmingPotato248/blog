import * as argon2 from "argon2";
import prisma from "../../lib/prisma";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const User = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(5),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405);
  const { email, name, password } = req.body;
  const result = User.safeParse(req.body);
  if (!result.success) {
    return res.status(403).json({ message: "Failed to create user" });
  }
  const hash = await argon2.hash(password);
  if (await prisma.user.findUnique({ where: { email } })) {
    return res.status(403).json({ message: "Email already in use" });
  }
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    return res.status(200).json({ message: "User successfully created" });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) console.log(e);
    return res.status(500);
  }
}
