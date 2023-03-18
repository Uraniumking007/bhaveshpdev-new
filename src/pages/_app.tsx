import { type AppType } from "next/dist/shared/lib/utils";

import "n/styles/globals.css";
import Layout from "n/components/Layouts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
