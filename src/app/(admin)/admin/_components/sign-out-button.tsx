"use client";

import MagicBorderButton from "@/components/Buttons/magic-border-button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <MagicBorderButton
      onClick={async () => {
        signOut();
      }}
    >
      SignOut
    </MagicBorderButton>
  );
}
