"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero from "../../../../../public/hero.png";

export function Hero() {
    const { t } = useTranslation("landing");

    return (
        <section className="container px-6 md:px-0 mx-auto pt-30">
            <main className="flex items-center justify-between">
                <article className="max-w-xl space-y-8">
                    <h1 className="text-4xl font-bold">{t("hero.title")}</h1>
                    <p className="text-lg text-muted-foreground">
                        {t("hero.description")}
                    </p>

                    <Button className="mb-16 lg:mb-0">
                        {t("hero.cta")}
                    </Button>
                </article>

                <div className="hidden lg:block">
                    <Image
                        src={hero}
                        width={800}
                        height={400}
                        className="object-contain"
                        quality={100}
                        priority
                        alt={t("hero.imageAlt")}
                    />
                </div>
            </main>
        </section>
    )
}