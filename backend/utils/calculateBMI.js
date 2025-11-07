export function calculateBMI(height, weight) {
  if (!height || !weight || height <= 0 || weight <= 0) {
    throw new Error("Ungültige Eingaben");
  }

  const bmi = weight / (height * height);

  let status = "";
  if (bmi < 16) status = "starkes Untergewicht";
  else if (bmi < 18.5) status = "Untergewicht";
  else if (bmi < 25) status = "Normalgewicht";
  else if (bmi < 30) status = "Übergewicht";
  else status = "Adipositas";

  return { bmi: parseFloat(bmi.toFixed(2)), status };
}
