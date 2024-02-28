import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { type AppProps } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import RootLayout from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { tabHistory } from "@/utils/atom";

const MyApp = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) => {
  const [, setCurrentTab] = useAtom(tabHistory);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentTab(router.asPath);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, setCurrentTab]);

  return (
    <AnimatePresence mode={"popLayout"} initial={false}>
      <SessionProvider session={session}>
        <RootLayout>
          <Component {...pageProps} key={router.asPath} />
        </RootLayout>
      </SessionProvider>
    </AnimatePresence>
  );
};

export default api.withTRPC(MyApp);
