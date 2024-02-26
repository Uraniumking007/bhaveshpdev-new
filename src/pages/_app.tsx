import { type Session } from "next-auth";
import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";
import { useEffect } from "react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import RootLayout from "@/components/layout";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "@/utils/animationVariants";

const MyApp = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) => {
  // const [, setCurrentTab] = useAtom(tabHistory);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setCurrentTab(router.asPath);
  //   };
  //   router.events.on("routeChangeStart", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [router, setCurrentTab]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <SessionProvider session={session}>
        <RootLayout>
          <Component {...pageProps} key={router.asPath} />
        </RootLayout>
      </SessionProvider>
    </AnimatePresence>
  );
};

export default api.withTRPC(MyApp);
