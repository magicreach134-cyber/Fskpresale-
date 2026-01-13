export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "2px solid #333",
        borderTop: "2px solid var(--gold)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
}
