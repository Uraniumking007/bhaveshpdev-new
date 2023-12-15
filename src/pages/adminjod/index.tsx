import CreateProjectModal from "@/components/Modals/create-project";
import LoginModal from "@/components/Modals/login-modal";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { Button } from "@material-tailwind/react";
import { type GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);

  console.log(session);

  async function handleLogOut() {
    await signOut();
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <LoginModal />;
  }

  return (
    <div>
      Admin Dashboard
      <br />
      <Button
        onClick={() => {
          void handleLogOut();
        }}
        className="btn btn-primary"
      >
        Logout
      </Button>
      <br />
      <Button
        onClick={() => {
          setOpenProjectModal(true);
        }}
        className="btn btn-primary"
      >
        Create Project
      </Button>
      <CreateProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
      />
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
