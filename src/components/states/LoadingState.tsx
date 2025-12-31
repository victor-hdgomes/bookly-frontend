interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export function LoadingState({ 
  message = "Carregando...", 
  minHeight = "100vh" 
}: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}


