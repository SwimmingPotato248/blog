import prisma from "../../lib/prisma";

export default function PostDetail({ post }) {
  return (
    <div className="mx-auto max-w-4xl flex flex-col justify-center items-center">
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.author.name}</p>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
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
