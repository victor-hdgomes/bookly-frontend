import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorHero from "../../../../../public/doctor-hero.png";

export function Hero() {
    return (
        <section className="container px-6 md:px-0 mx-auto pt-30">
            <main className="flex items-center justify-between">
                <article className="max-w-xl space-y-8">
                    <h1 className="text-4xl font-bold">Encontre os melhores profissionais em um único local!</h1>
                    <p>
                        Nós somos uma plataforma para profissionais da saúde com foco em agilizar seu atendimento
                        de forma simplificada e organizada.
                    </p>

                    <Button className="mb-16 lg:mb-0">
                        Encontre um profissional
                    </Button>
                </article>

                <div className="hidden lg:block">
                    <Image
                        src={doctorHero}
                        width={340}
                        height={400}
                        className="object-contain"
                        quality={100}
                        priority
                        alt="Image of a healthcare professional attending a patient"
                    />
                </div>
            </main>
        </section>
    )
}