import { Card, CardContent } from "@/components/ui/card";
import { ProfessionalCardProps } from "@/app/(public)/_components/Professionals/types/professional-card-props";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import professionalImage1 from "../../../../../public/professional.png";
import Link from "next/link";

export function Professionals() {
    const professionals: ProfessionalCardProps[] = [
        {
            name: "Dr. João Silva",
            location: "São Paulo, SP",
            isOpen: true,
        },
        {
            name: "Dra. Maria Souza",
            location: "Rio de Janeiro, RJ",
            isOpen: false,
        },
        {
            name: "Dr. Pedro Almeida",
            location: "Belo Horizonte, MG",
            isOpen: true,
        },
        {
            name: "Dra. Ana Carvalho",
            location: "Curitiba, PR",
            isOpen: true,
        },
    ]

    return (
        <section id="professionals" className="bg-secondary py-16">
            <main className="container mx-auto px-6 md:px-0">
                <h2 className="text-3xl text-center mb-12 font-bold">Profissionais</h2>

                <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {professionals.map((prof) => (
                        <Card key={prof.name} className="flex flex-col pt-0 px-0 overflow-hidden">
                            <div className="relative w-full h-48">
                                <Image
                                    src={professionalImage1}
                                    alt={`Imagem de ${prof.name}`}
                                    fill
                                    className="w-full h-48 object-cover rounded-t-md"
                                />
                            </div>

                            <CardContent className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-lg">{prof.name}</h3>
                                    {prof.isOpen ? (
                                        <CheckCircle className="text-green-500 w-5 h-5" />
                                    ) : (
                                        <XCircle className="text-red-500 w-5 h-5" />
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">{prof.location}</p>
                                
                                <Button variant="default" className="mt-2 items-center" asChild>
                                    <Link href={prof.isOpen ? "/schedule" : "#"}>
                                        Agendar Horário
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </section>
    );
}