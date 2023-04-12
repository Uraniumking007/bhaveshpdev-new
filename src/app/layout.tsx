import './globals.css';
import MaterialHeader from './components/BrandNewHeader';
import Script from 'next/script';

export const metadata = {
  title: 'Bhavesh Patil',
  description:
    "I'm a computer engineering student who enjoys using JavaScript,TypeScript, Next.js, and Tailwind CSS. I am interested about creating dynamic, responsive web applications that provide an excellent user experience.",
  icons: {
    icon: '/assets/bhavesh5.jpg',
    other: {
      rel: 'stylesheet',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme='night' className=''>
      <body className='h-screen overflow-hidden w-full'>
        <MaterialHeader />
        {children}
        <Script
          async
          defer
          data-website-id='47bf1143-18d3-42f9-a612-87498dc2d1b7'
          src='https://umami-analytics-fawn.vercel.app/umami.js'
        />
      </body>
    </html>
  );
}
