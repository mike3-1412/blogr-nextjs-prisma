import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
    },
  });

  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  };
};

type Props = {
  feed: PostProps[];
};

const Index: React.FC<Props> = (props) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Blogr</span>
          </h1>
          <p className="hero-subtitle">
            Discover inspiring stories, ideas, and expertise from writers on any
            topic.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{props.feed.length}</span>
              <span className="stat-label">Published Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Possibilities</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="feed-section">
        <div className="section-header">
          <h2 className="section-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
            Latest Stories
          </h2>
          <p className="section-subtitle">Fresh from the community</p>
        </div>

        {props.feed.length === 0 ? (
          <div className="empty-state">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h3>No posts yet</h3>
            <p>Be the first to share your thoughts with the community!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {props.feed.map((post, index) => (
              <div
                key={post.id}
                className="post-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Post post={post} />
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
