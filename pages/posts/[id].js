import Head from "next/head";
import prisma from "../../lib/prisma";

export default function PostDetail({ post }) {
  return (
    <>
      <Head>
        <title key="title">{post.title}</title>
      </Head>
      <div className="mx-auto max-w-2xl flex flex-col justify-center gap-2">
        <p className="text-2xl mx-auto">{post.title}</p>
        <p className="text-sm mx-auto">Author: {post.author.name}</p>
        <p className="text-sm mx-auto">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="whitespace-pre-line text-left">{post.content}</p>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const post = JSON.parse(
    JSON.stringify(
      await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: { author: true },
      })
    )
  );
  if (!post) return { notFound: true };
  return {
    props: { post },
  };
}
