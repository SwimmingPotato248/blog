import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between px-14 py-4 bg-black text-white mb-6">
      <Link href="/">Logos</Link>
      <div className="flex gap-6">
        {session ? (
          <>
            <Link href="/posts/create">Create new post</Link>
            <div>{session.user.name}</div>
            <button onClick={() => signOut()}>Log out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </nav>
  );
}
