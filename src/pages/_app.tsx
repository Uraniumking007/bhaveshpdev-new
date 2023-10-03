import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useEffect } from "react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import RootLayout from "@/components/layout";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { tabHistory } from "@/utils/atom";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
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
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
