import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link href="/" className="brand">
            <span className="brand-name">Blogr</span>
          </Link>

          <nav className="main-nav">
            <Link
              href="/"
              className={`nav-item ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>

            {session && (
              <Link
                href="/drafts"
                className={`nav-item ${isActive("/drafts") ? "active" : ""}`}
              >
                My Drafts
              </Link>
            )}
          </nav>
        </div>

        <div className="header-right">
          {status === "loading" && (
            <span className="auth-status">Loading...</span>
          )}

          {!session && (
            <Link href="/api/auth/signin" className="auth-link">
              Sign In
            </Link>
          )}

          {session && (
            <div className="user-section">
              <div className="user-details">
                <span className="user-name">{session.user?.name}</span>
                {session.user?.email && (
                  <span className="user-email">{session.user.email}</span>
                )}
              </div>

              <div className="action-links">
                <Link href="/create" className="create-link">
                  New Post
                </Link>
                <button onClick={() => signOut()} className="signout-btn">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .brand {
          text-decoration: none;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.025em;
        }

        .main-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .nav-item:hover {
          color: #111827;
          background: #f3f4f6;
        }

        .nav-item.active {
          color: #111827;
          background: #f3f4f6;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .auth-status {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .auth-link {
          padding: 0.5rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .auth-link:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #111827;
        }

        .user-email {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .action-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .create-link {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          background: #111827;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .create-link:hover {
          background: #000000;
        }

        .signout-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .signout-btn:hover {
          color: #111827;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
            height: auto;
            flex-direction: column;
            gap: 0.75rem;
            padding-top: 1rem;
            padding-bottom: 0.75rem;
          }

          .header-left {
            width: 100%;
            justify-content: space-between;
            gap: 1rem;
          }

          .main-nav {
            gap: 0.25rem;
          }

          .nav-item {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
          }

          .user-section {
            width: 100%;
            justify-content: space-between;
          }

          .user-details {
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
}
