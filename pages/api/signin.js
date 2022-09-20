import prisma from "../../lib/prisma";
import * as argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    if (req.method !== "POST") return res.status(403);
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(400).json({ message: "Incorrect email or password" });
    const pwMatch = argon2.verify(user.password, password);
    if (!pwMatch)
      return res.status(400).json({ message: "Incorrect email or password" });
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "myapp_cookiename",
    password: process.env.COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
