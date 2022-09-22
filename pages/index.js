import Link from "next/link";
import prisma from "../lib/prisma";

export default function Home({ posts }) {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
      {posts.map(post => {
        return (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="bg-slate-200 p-4 cursor-pointer">
              <h1 className="text-4xl">{post.title}</h1>
              <p>Author: {post.author.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      author: true,
    },
  });
  const data = JSON.parse(JSON.stringify(posts));
  return {
    props: {
      posts: data,
    },
  };
}
