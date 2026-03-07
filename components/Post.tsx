import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string | null;
    email: string | null;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author?.name ?? "Unknown author";

  return (
    <article className="post-card" onClick={() => Router.push(`/p/${post.id}`)}>
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        {!post.published && <span className="draft-badge">Draft</span>}
      </div>
      
      <div className="post-meta">
        <div className="author-avatar">
          {authorName.charAt(0).toUpperCase()}
        </div>
        <div className="author-info">
          <span className="author-name">{authorName}</span>
          <span className="post-date">Just now</span>
        </div>
      </div>
      
      <div className="post-content">
        <ReactMarkdown>
          {post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content}
        </ReactMarkdown>
      </div>
      
      <div className="post-footer">
        <span className="read-more">
          Read more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>

      <style jsx>{`
        .post-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .post-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%);
          opacity: 0;
          transition: var(--transition);
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .post-card:hover::before {
          opacity: 1;
        }

        .post-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .post-title {
          font-size: 1.375rem;
          color: var(--text);
          line-height: 1.4;
        }

        .draft-badge {
          background: #fef3c7;
          color: #d97706;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .author-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: var(--text);
          font-size: 0.875rem;
        }

        .post-date {
          color: var(--text-light);
          font-size: 0.75rem;
        }

        .post-content {
          color: var(--text-light);
          font-size: 0.9375rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .post-content :global(p) {
          margin: 0;
        }

        .post-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.875rem;
          transition: var(--transition);
        }

        .post-card:hover .read-more {
          gap: 0.625rem;
        }
      `}</style>
    </article>
  );
};

export default Post;
