"use client";

import { useProfileForm } from "@/app/(logged-panel)/client/profile/hooks/useProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types/prisma-models";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export interface ProfileContentProps {
    user: User;
}

export default function ProfileContent({ user }: ProfileContentProps) {
    const { t } = useTranslation('profile');
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
                            <CardTitle>{t('profileTitle')}</CardTitle>
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
                                        <FormLabel>{t('firstName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={t('enterFirstName')} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('lastName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={t('enterLastName')} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('displayName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={t('enterDisplayName')} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('email')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={t('enterEmail')} type="email" disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
