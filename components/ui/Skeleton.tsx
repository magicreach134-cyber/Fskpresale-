export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 ${className}`}
    />
  );
}
