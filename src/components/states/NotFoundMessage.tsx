interface NotFoundMessageProps {
  title: string
  description: string
  appName: string
}

export function NotFoundMessage({ title, description, appName }: NotFoundMessageProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl md:text-4xl font-bold">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        {description}{" "}
        <span className="font-semibold text-foreground">{appName}</span>.
      </p>
    </div>
  )
}
