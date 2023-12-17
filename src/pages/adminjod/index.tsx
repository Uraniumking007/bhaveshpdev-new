import CreateProjectModal from "@/components/Modals/create-project";
import LoginModal from "@/components/Modals/login-modal";
import AdminCards from "@/components/cards/admin-cards";
import Loading from "@/components/loading";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Button } from "@material-tailwind/react";
import { type GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const AdminDashboard = () => {
  const { status } = useSession();
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const { data, error, isFetched, isLoading } =
    api.example.getProjects.useQuery(undefined, {
      staleTime: 100 * 60 * 5,
    });

  async function handleLogOut() {
    await signOut();
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <LoginModal />;
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!isFetched) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col justify-evenly">
      <p>Admin Dashboard</p>
      <div className="flex w-full justify-between px-10 py-4">
        <Button
          onClick={() => {
            void handleLogOut();
          }}
          className="btn btn-primary"
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            setOpenProjectModal(true);
          }}
          className="btn btn-primary"
        >
          Create Project
        </Button>
      </div>
      <CreateProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
      />
      <div className="flex w-full flex-col items-center justify-center gap-2 px-10 align-middle">
        {data.projects.map((project, key) => (
          <AdminCards {...project} key={key} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session?.user.email) {
    return {
      props: {
        isAllowed: false,
        user: null,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return {
    props: { isAllowed: user?.isAdmin ? true : false, user },
  };
};

export default AdminDashboard;
