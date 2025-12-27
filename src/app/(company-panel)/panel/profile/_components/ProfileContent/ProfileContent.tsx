"use client";

import { useProfileForm } from "@/app/(company-panel)/panel/profile/hooks/useProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Company } from "@/types/prisma-models";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface ProfileContentProps {
    user: User;
}

export default function ProfileContent({ user }: ProfileContentProps) {
    const form = useProfileForm({
        defaultValues: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            displayName: user.displayName || '',
            email: user.email || '',
            photo: user.photo || '',
        }
    });

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form action="">
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden">
                                    <Image
                                        src={user?.photo ?? ''}
                                        alt="User Profile Photo"
                                        fill
                                        priority
                                        quality={100}
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primeiro Nome</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o primeiro nome" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o sobrenome" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome de Exibição</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o nome de exibição" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o email" type="email" disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {user?.companies && user.companies.length > 0 ? (
                                <div className="space-y-2">
                                    <FormLabel className="font-semibold">Empresas vinculadas</FormLabel>
                                    <ul className="list-disc ml-6">
                                        {user.companies.map((company: Company) => (
                                            <li key={company.id}>{company.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <FormLabel className="font-semibold">Você ainda não possui empresa</FormLabel>
                                    <Button variant="outline">Criar empresa</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
