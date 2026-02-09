// import React from "react";
// import Router from "next/router";
// import ReactMarkdown from "react-markdown";

// export type PostProps = {
//   id: string;
//   title: string;
//   author: {
//     name: string | null;
//     email: string | null;
//   } | null;
//   content: string;
//   published: boolean;
// };

// const Post: React.FC<{ post: PostProps }> = ({ post }) => {
//   const authorName = post.author?.name ?? "Unknown author";

//   return (
//     <div onClick={() => Router.push(`/p/${post.id}`)}>
//       <h2>{post.title}</h2>
//       <small>By {authorName}</small>
//       <ReactMarkdown>{post.content}</ReactMarkdown>

//       <style jsx>{`
//         div {
//           cursor: pointer;
//           padding: 2rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Post;
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
    <div onClick={() => Router.push(`/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>

      <style jsx>{`
        div {
          cursor: pointer;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
