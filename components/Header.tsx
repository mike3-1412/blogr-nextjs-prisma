import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="nav">
      <div className="left">
        <Link href="/" className={isActive("/") ? "active" : ""}>
          Feed
        </Link>

        {session && (
          <Link href="/drafts" className={isActive("/drafts") ? "active" : ""}>
            My drafts
          </Link>
        )}
      </div>

      <div className="right">
        {status === "loading" && <p>Loading...</p>}

        {!session && <Link href="/api/auth/signin">Log in</Link>}

        {session && (
          <>
            <span>{session.user?.name}</span>
            <Link href="/create">New post</Link>
            <button onClick={() => signOut()}>Log out</button>
          </>
        )}
      </div>

      <style jsx>{`
        .nav {
          display: flex;
          padding: 1.5rem;
          align-items: center;
        }
        .left a {
          margin-right: 1rem;
        }
        .right {
          margin-left: auto;
        }
        .active {
          font-weight: bold;
        }
        button {
          margin-left: 1rem;
        }
      `}</style>
    </nav>
  );
}
