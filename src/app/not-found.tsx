"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { NotFoundAnimation } from "@/components/states/NotFoundAnimation"
import { NotFoundMessage } from "@/components/states/NotFoundMessage"
import { NotFoundActions } from "@/components/states/NotFoundActions"
import { NotFoundDecorations } from "@/components/states/NotFoundDecorations"

export default function NotFound() {
  const router = useRouter()
  const { t } = useTranslation('notFound')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <NotFoundAnimation />
        
        <NotFoundMessage 
          title={t('heading')}
          description={t('description')}
          appName={t('appName')}
        />

        <NotFoundActions
          onBack={() => router.back()}
          backLabel={t('backButton')}
          homeLabel={t('homeButton')}
        />

        <NotFoundDecorations />
      </div>
    </div>
  )
}
