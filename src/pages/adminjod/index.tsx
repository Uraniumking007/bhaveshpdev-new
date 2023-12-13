import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  return <div>Admin Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session?.user.email) {
    return {
      redirect: {
        destination: "/adminjod/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  

  return {
    props: { session },
  };
};
