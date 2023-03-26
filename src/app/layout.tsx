import './globals.css';
import MaterialHeader from './components/BrandNewHeader';

export const metadata = {
  title: 'Bhavesh Patil',
  description:
    "I'm a computer engineering student who enjoys using JavaScript,TypeScript, Next.js, and Tailwind CSS. I am interested about creating dynamic, responsive web applications that provide an excellent user experience.",
  icons: {
    icon: '/BhaveshPatil.jpg',
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
      <body className='h-screen w-full'>
        {/* <NewHeader /> */}
        {/* <Header /> */}
        <MaterialHeader />
        {children}
      </body>
    </html>
  );
}
