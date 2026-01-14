export default function Skeleton({ height = 20 }) {
  return (
    <div
      style={{
        height,
        background: "linear-gradient(90deg,#111,#222,#111)",
        borderRadius: 6,
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}
