import { Footer, Header, Hero, Professionals } from "@/app/(public)/_components";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Professionals />
      <Footer />
    </div>
  );
}
