import { Header } from "@/app/(public)/_components/Header/Header";
import { Hero } from "@/app/(public)/_components/Hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Hero />
    </div>
  );
}
