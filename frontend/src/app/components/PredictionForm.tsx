 "use client";

import { FormEvent, useState } from "react";
import ResultCard from "./ResultCard";

type FormValues = {
  Age: number;
  Sex: string;
  ChestPainType: string;
  RestingBP: number;
  Cholesterol: number;
  FastingBS: number;
  RestingECG: string;
  MaxHR: number;
  ExerciseAngina: string;
  Oldpeak: number;
  ST_Slope: string;
};

type PredictionResult = { prediction: number; message: string };

const initialValues: FormValues = {
  Age: 40,
  Sex: "M",
  ChestPainType: "ATA",
  RestingBP: 120,
  Cholesterol: 200,
  FastingBS: 0,
  RestingECG: "Normal",
  MaxHR: 150,
  ExerciseAngina: "N",
  Oldpeak: 1,
  ST_Slope: "Up",
};

export default function PredictionForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setResult(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiUrl) {
      setError("The prediction API URL is not configured. Set NEXT_PUBLIC_API_URL in your frontend environment variables.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.detail || "The prediction service could not process this request.");
      }
      if (typeof payload?.prediction !== "number" || typeof payload?.message !== "string") {
        throw new Error("The API returned an unexpected response. Check the backend response format.");
      }
      setResult(payload as PredictionResult);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to connect to the prediction service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="assessment-card" onSubmit={handleSubmit}>
      <div className="form-intro">
        <div className="form-intro-icon">✳</div>
        <div><strong>Patient information</strong><p>Use the values available to you. All fields are required.</p></div>
      </div>

      <div className="field-grid">
        <label className="field">
          <span>Age <em>(years)</em></span>
          <div className="range-value"><strong>{values.Age}</strong><span>years</span></div>
          <input type="range" min="18" max="100" value={values.Age} onChange={(e) => update("Age", Number(e.target.value))} />
          <div className="range-labels"><span>18</span><span>100</span></div>
        </label>

        <label className="field">
          <span>Sex</span>
          <select value={values.Sex} onChange={(e) => update("Sex", e.target.value)}>
            <option value="M">Male (M)</option><option value="F">Female (F)</option>
          </select>
        </label>

        <label className="field">
          <span>Chest pain type</span>
          <select value={values.ChestPainType} onChange={(e) => update("ChestPainType", e.target.value)}>
            <option value="ATA">Atypical Angina (ATA)</option>
            <option value="NAP">Non-Anginal Pain (NAP)</option>
            <option value="TA">Typical Angina (TA)</option>
            <option value="ASY">Asymptomatic (ASY)</option>
          </select>
        </label>

        <label className="field">
          <span>Resting blood pressure <em>(mm Hg)</em></span>
          <div className="number-wrap"><input type="number" min="80" max="200" required value={values.RestingBP} onChange={(e) => update("RestingBP", Number(e.target.value))} /><span>mm Hg</span></div>
        </label>

        <label className="field">
          <span>Cholesterol <em>(mg/dL)</em></span>
          <div className="number-wrap"><input type="number" min="100" max="600" required value={values.Cholesterol} onChange={(e) => update("Cholesterol", Number(e.target.value))} /><span>mg/dL</span></div>
        </label>

        <label className="field">
          <span>Fasting blood sugar above 120 mg/dL?</span>
          <select value={String(values.FastingBS)} onChange={(e) => update("FastingBS", Number(e.target.value))}>
            <option value="0">No (0)</option><option value="1">Yes (1)</option>
          </select>
        </label>

        <label className="field">
          <span>Resting ECG</span>
          <select value={values.RestingECG} onChange={(e) => update("RestingECG", e.target.value)}>
            <option value="Normal">Normal</option><option value="ST">ST</option><option value="LVH">LVH</option>
          </select>
        </label>

        <label className="field">
          <span>Maximum heart rate</span>
          <div className="range-value"><strong>{values.MaxHR}</strong><span>bpm</span></div>
          <input type="range" min="60" max="220" value={values.MaxHR} onChange={(e) => update("MaxHR", Number(e.target.value))} />
          <div className="range-labels"><span>60 bpm</span><span>220 bpm</span></div>
        </label>

        <label className="field">
          <span>Exercise-induced angina</span>
          <select value={values.ExerciseAngina} onChange={(e) => update("ExerciseAngina", e.target.value)}>
            <option value="N">No (N)</option><option value="Y">Yes (Y)</option>
          </select>
        </label>

        <label className="field">
          <span>Oldpeak <em>(ST depression)</em></span>
          <div className="range-value"><strong>{values.Oldpeak.toFixed(1)}</strong><span>units</span></div>
          <input type="range" min="-3" max="7" step="0.1" value={values.Oldpeak} onChange={(e) => update("Oldpeak", Number(e.target.value))} />
          <div className="range-labels"><span>-3.0</span><span>7.0</span></div>
        </label>

        <label className="field field-full">
          <span>ST slope</span>
          <div className="radio-options">
            {(["Up", "Flat", "Down"] as const).map((slope) => (
              <button className={`radio-option ${values.ST_Slope === slope ? "selected" : ""}`} type="button" key={slope} onClick={() => update("ST_Slope", slope)}>
                <span className="radio-dot" /><span>{slope}</span>
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="form-actions">
        <p><span className="secure-icon">◇</span> Your entries are sent to the configured prediction API.</p>
        <button className="predict-button" type="submit" disabled={loading}>
          {loading ? <><span className="spinner" /> Analyzing…</> : <>Generate prediction <span aria-hidden="true">→</span></>}
        </button>
      </div>

      {error && <div className="error-message" role="alert"><strong>Could not generate prediction</strong><p>{error}</p></div>}
      {result && <ResultCard prediction={result.prediction} message={result.message} />}
    </form>
  );
}
