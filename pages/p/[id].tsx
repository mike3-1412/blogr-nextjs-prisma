import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      author: {
        select: { name: true, email: true },
      },
    },
  });
  if (!post) {
    return { notFound: true };
  }
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  const response = await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  if (response.ok) {
    await Router.push("/");
  } else {
    console.error("Failed to publish post");
    alert("Failed to publish the post. Please try again.");
  }
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Authenticating...</p>
        </div>
      </Layout>
    );
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  const authorName = props?.author?.name || "Unknown author";
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <Layout>
      <div className="post-page">
        {/* Back Navigation */}
        <Link href="/" className="back-link">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>

        {/* Post Card */}
        <article className="post-card">
          {/* Post Header */}
          <header className="post-header">
            <div className="header-top">
              {!props.published ? (
                <span className="badge badge-draft">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Draft
                </span>
              ) : (
                <span className="badge badge-published">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Published
                </span>
              )}
            </div>

            <h1 className="post-title">{props.title}</h1>

            <div className="post-meta">
              <div className="author-avatar">{authorInitial}</div>
              <div className="author-info">
                <span className="author-name">{authorName}</span>
                <span className="post-status">
                  {props.published ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="post-content">
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>

          {/* Action Buttons */}
          {userHasValidSession && postBelongsToUser && (
            <div className="post-actions">
              {!props.published && (
                <button
                  onClick={() => publishPost(props.id)}
                  className="btn btn-publish"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Publish Now
                </button>
              )}
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete this post? This action cannot be undone.",
                    )
                  ) {
                    deletePost(props.id);
                  }
                }}
                className="btn btn-delete"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </button>
            </div>
          )}
        </article>
      </div>
    </Layout>
  );
};

export default Post;
