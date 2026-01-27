import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
    },
  });

  return {
    props: { feed },
  };
};

export default function Home({ feed }: any) {
  return <h1>Hello Next.js</h1>;
}
