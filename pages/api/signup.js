import prisma from "../../lib/prisma";
import * as argon2 from "argon2";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const { email, name, password } = req.body;
  const hash = await argon2.hash(password);
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });
    res.status(200).json({ ok: true, message: "User successfully created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
