import { useRouter } from "next/router";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Post id: {id}</div>;
}
