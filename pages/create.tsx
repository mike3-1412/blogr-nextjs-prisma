import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="create-container">
        <div className="form-card">
          <div className="form-header">
            <h1>Create New Post</h1>
            <p>Share your thoughts with the world</p>
          </div>

          <form onSubmit={submitData} className="create-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title..."
                type="text"
                value={title}
                className={title ? "has-value" : ""}
              />
              <span className="input-highlight"></span>
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                cols={50}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your amazing story here..."
                rows={12}
                value={content}
                className={content ? "has-value" : ""}
              />
              <span className="input-highlight"></span>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => Router.push("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={!content || !title || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Publish
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Draft;
