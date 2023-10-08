import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>Bhavesh Patil | Fullstack Web Developer</title> */}
        <meta
          name="description"
          content="I'm a computer engineering student who enjoys using JavaScript,TypeScript, Next.js, and Tailwind CSS. I am interested about creating dynamic, responsive web applications that provide an excellent user experience."
        />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </Head>
      <body data-theme="night">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
