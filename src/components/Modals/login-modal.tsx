import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginModal = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const handleLoginModal = () => setOpenLoginModal(!openLoginModal);

  const handleLogin = async () => {
    await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      callbackUrl: "/adminjod",
      redirect: false,
    });

    setOpenLoginModal(false);
  };

  return (
    <div>
      <Dialog placeholder={""} handler={handleLoginModal} open={true}>
        <DialogHeader placeholder={""}> Login Now</DialogHeader>
        <DialogBody placeholder={""}>
          <div className="flex  flex-col gap-8">
            <Input
              crossOrigin=""
              variant="static"
              label="Email"
              type="email"
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              placeholder="yourname@mail.com"
            />
            <Input
              crossOrigin=""
              type="password"
              variant="static"
              label="Password"
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              placeholder="password"
            />
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <div className="flex gap-4">
            <Button
              placeholder={""}
              className="btn btn-primary"
              onClick={() => {
                void handleLogin();
              }}
            >
              Login
            </Button>
            <Button
              placeholder={""}
              className="btn btn-primary"
              onClick={() => {
                void router.push("/");
              }}
            >
              Go Home
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default LoginModal;
