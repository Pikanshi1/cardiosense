type ResultCardProps = {
  prediction: number;
  message: string;
};

export default function ResultCard({ prediction, message }: ResultCardProps) {
  const isPositive = prediction === 1;
  return (
    <section className={`result-card ${isPositive ? "result-warning" : "result-neutral"}`} aria-live="polite">
      <div className="result-icon" aria-hidden="true">{isPositive ? "!" : "✓"}</div>
      <div className="result-copy">
        <div className="result-label">MODEL OUTPUT</div>
        <h3>{message}</h3>
        <p>
          {isPositive
            ? "The model returned its positive class. This is not a diagnosis; please discuss health concerns with a qualified healthcare professional."
            : "The model returned its negative class. This does not rule out heart disease or guarantee that you are healthy."}
        </p>
      </div>
    </section>
  );
}
