from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import joblib
from pathlib import Path

app = FastAPI(title="Heart Disease Prediction API")

BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(BASE_DIR / "Knn_heart_model.pkl")
scaler = joblib.load(BASE_DIR / "heart_scaler.pkl")
expected_columns = joblib.load(BASE_DIR / "heart_columns.pkl")

class PatientData(BaseModel):
    Age: int = Field(ge=1, le=120)
    Sex: str
    ChestPainType: str
    RestingBP: int = Field(ge=0, le=300)
    Cholesterol: int = Field(ge=0, le=1000)
    FastingBS: int = Field(ge=0, le=1)
    RestingECG: str
    MaxHR: int = Field(ge=0, le=300)
    ExerciseAngina: str
    Oldpeak: float = Field(ge=-10, le=20)
    ST_Slope: str


@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running"}


@app.post("/predict")
def predict(data: PatientData):
    allowed_values = {
        "Sex": {"M", "F"},
        "ChestPainType": {"ATA", "NAP", "TA", "ASY"},
        "RestingECG": {"Normal", "ST", "LVH"},
        "ExerciseAngina": {"Y", "N"},
        "ST_Slope": {"Up", "Flat", "Down"},
    }

    for field, allowed in allowed_values.items():
        value = getattr(data, field)

        if value not in allowed:
            raise HTTPException(
                status_code=422,
                detail=f"Invalid {field}. Allowed values: {sorted(allowed)}",
            )

    raw_input = {
        "Age": data.Age,
        "RestingBP": data.RestingBP,
        "Cholesterol": data.Cholesterol,
        "FastingBS": data.FastingBS,
        "MaxHR": data.MaxHR,
        "Oldpeak": data.Oldpeak,
        "Sex_M": int(data.Sex == "M"),
        "ChestPainType_ATA": int(data.ChestPainType == "ATA"),
        "ChestPainType_NAP": int(data.ChestPainType == "NAP"),
        "ChestPainType_TA": int(data.ChestPainType == "TA"),
        "RestingECG_Normal": int(data.RestingECG == "Normal"),
        "RestingECG_ST": int(data.RestingECG == "ST"),
        "ExerciseAngina_Y": int(data.ExerciseAngina == "Y"),
        "ST_Slope_Flat": int(data.ST_Slope == "Flat"),
        "ST_Slope_Up": int(data.ST_Slope == "Up"),
    }

    input_df = pd.DataFrame([raw_input])
    input_df = input_df[expected_columns]

    scaled_input = scaler.transform(input_df)
    prediction = int(model.predict(scaled_input)[0])

    return {
        "prediction": prediction,
        "message": (
            "Positive model prediction"
            if prediction == 1
            else "Negative model prediction"
        ),
    }
