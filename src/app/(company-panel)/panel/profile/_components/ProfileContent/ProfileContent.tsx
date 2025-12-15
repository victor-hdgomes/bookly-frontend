"use client";

import { useProfileForm } from "@/app/(company-panel)/panel/profile/hooks/useProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Auth } from "@/hooks/panel/profile/useAuth";
import Image from "next/image";

export default function ProfileContent({ user }: { user: Auth }) {
    const form = useProfileForm();

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form action="">
                    <Card>
                        <CardHeader>
                            <CardTitle>Perfil</CardTitle>

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

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome Completo</FormLabel>

                                                <FormControl>
                                                    <Input {...field} placeholder="Digite o Nome Completo" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status da Clínica</FormLabel>

                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione o status" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem value="true">Aberto</SelectItem>
                                                            <SelectItem value="false">Fechado</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
