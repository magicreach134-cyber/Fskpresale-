import { Skeleton } from "./Skeleton";

export default function TokenomicsCard() {
  const loading = false; // static, but future-proof

  return (
    <div className="card">
      <h2>Tokenomics</h2>

      {loading ? (
        <>
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-box" />
        </>
      ) : (
        <>
          <ul>
            <li>Presale: 50%</li>
            <li>Liquidity: 15%</li>
            <li>Ecosystem: 25%</li>
            <li>Team: 5%</li>
            <li>Community: 5%</li>
          </ul>

          <img
            src="/tokenomics.png"
            alt="FSK Tokenomics"
            style={{ width: "100%", marginTop: 16 }}
          />

          <a
            href="/FressKing-Whitepaper.pdf"
            target="_blank"
            style={{ color: "var(--gold)", marginTop: 12, display: "inline-block" }}
          >
            View Whitepaper
          </a>
        </>
      )}
    </div>
  );
}
