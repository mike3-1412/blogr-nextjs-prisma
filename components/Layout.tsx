import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <footer className="footer">
      <p>© 2024 Blogr. All rights reserved.</p>
    </footer>
    <style jsx global>{`
      :root {
        --primary: #2563eb;
        --primary-dark: #1d4ed8;
        --secondary: #64748b;
        --background: #f8fafc;
        --surface: #ffffff;
        --text: #1e293b;
        --text-light: #64748b;
        --border: #e2e8f0;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        --radius: 12px;
        --radius-sm: 8px;
        --transition: all 0.3s ease;
      }

      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: var(--background);
        color: var(--text);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: 700;
        line-height: 1.2;
      }

      a {
        color: var(--primary);
        text-decoration: none;
        transition: var(--transition);
      }

      a:hover {
        color: var(--primary-dark);
      }

      input,
      textarea {
        font-size: 16px;
        font-family: inherit;
      }

      button {
        cursor: pointer;
        font-family: inherit;
      }

      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: var(--background);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--secondary);
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
        max-width: 1200px;
        margin: 0 auto;
        min-height: calc(100vh - 180px);
      }

      .footer {
        text-align: center;
        padding: 2rem;
        color: var(--text-light);
        border-top: 1px solid var(--border);
        margin-top: 4rem;
      }

      @media (max-width: 768px) {
        .layout {
          padding: 0 1rem;
        }
      }
    `}</style>
  </div>
);

export default Layout;
