import { withIronSessionSsr } from "iron-session/next";

export default function Home({ user }) {
  console.log(user);
  return <h1>Hello world</h1>;
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    return {
      props: {
        user,
      },
    };
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
