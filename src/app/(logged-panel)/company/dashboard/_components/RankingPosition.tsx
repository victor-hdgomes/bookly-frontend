interface RankingPositionProps {
  position: number;
}

export function RankingPosition({ position }: RankingPositionProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold">
      #{position}
    </div>
  );
}
