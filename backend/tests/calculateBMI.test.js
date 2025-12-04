import { calculateBMI } from "../utils/calculateBMI.js";

describe("calculateBMI", () => {
  test("berechnet korrekt den BMI und Status für Normalgewicht", () => {
    const result = calculateBMI(1.8, 75);
    expect(result.bmi).toBeCloseTo(23.15, 2);
    expect(result.status).toBe("Normalgewicht");
  });

  test("gibt 'Untergewicht' zurück, wenn BMI unter 18.5 liegt", () => {
    const result = calculateBMI(1.75, 50);
    expect(result.status).toBe("Untergewicht");
  });

  test("gibt 'Übergewicht' zurück, wenn BMI über 25 liegt", () => {
    const result = calculateBMI(1.7, 80);
    expect(result.status).toBe("Übergewicht");
  });

  test("gibt 'Adipositas' zurück, wenn BMI über 30 liegt", () => {
    const result = calculateBMI(1.7, 100);
    expect(result.status).toBe("Adipositas");
    expect(result.bmi).toBeGreaterThan(30);
  });

  test("gibt 'starkes Untergewicht' zurück, wenn BMI unter 16 liegt", () => {
    const result = calculateBMI(1.75, 40);
    expect(result.status).toBe("starkes Untergewicht");
    expect(result.bmi).toBeLessThan(16);
  });

  test("wirft Fehler bei ungültigen Eingaben", () => {
    expect(() => calculateBMI(0, 70)).toThrow("Ungültige Eingaben");
    expect(() => calculateBMI(1.8, -5)).toThrow("Ungültige Eingaben");
    expect(() => calculateBMI(null, 70)).toThrow("Ungültige Eingaben");
    expect(() => calculateBMI(1.8, null)).toThrow("Ungültige Eingaben");
  });
});
