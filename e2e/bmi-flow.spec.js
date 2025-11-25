import { test, expect } from '@playwright/test';

test.describe('BMI Calculator Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login before each test
    await page.goto('/registrierung');
    
    const timestamp = Date.now();
    const testEmail = `bmitest${timestamp}@example.com`;
    
    await page.fill('input[name="name"]', 'BMI Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('should calculate and save BMI', async ({ page }) => {
    // Navigate to BMI calculator
    await page.click('text=BMI Rechner');
    await expect(page).toHaveURL(/.*bmi/);
    
    // Fill BMI form
    await page.fill('input[name="name"]', 'BMI Test User');
    await page.fill('input[name="email"]', 'bmitest@example.com');
    await page.fill('input[name="age"]', '30');
    await page.fill('input[name="height"]', '180');
    await page.fill('input[name="weight"]', '75');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should show result
    await expect(page.locator('.bmi-result')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.bmi-result')).toContainText('BMI');
    await expect(page.locator('.bmi-result')).toContainText('Status');
  });

  test('should navigate to statistics page', async ({ page }) => {
    // First add a BMI record
    await page.click('text=BMI Rechner');
    await page.fill('input[name="name"]', 'Stats Test');
    await page.fill('input[name="email"]', 'stats@example.com');
    await page.fill('input[name="age"]', '25');
    await page.fill('input[name="height"]', '175');
    await page.fill('input[name="weight"]', '70');
    await page.click('button[type="submit"]');
    
    // Wait for result
    await expect(page.locator('.bmi-result')).toBeVisible({ timeout: 5000 });
    
    // Navigate to statistics
    await page.click('text=Statistiken');
    await expect(page).toHaveURL(/.*statistiken/);
    
    // Should show statistics page
    await expect(page.locator('h1')).toContainText('Statistiken');
  });

  test('should navigate to programs page', async ({ page }) => {
    // First add a BMI record to get recommendations
    await page.click('text=BMI Rechner');
    await page.fill('input[name="name"]', 'Program Test');
    await page.fill('input[name="email"]', 'program@example.com');
    await page.fill('input[name="age"]', '28');
    await page.fill('input[name="height"]', '170');
    await page.fill('input[name="weight"]', '80');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bmi-result')).toBeVisible({ timeout: 5000 });
    
    // Navigate to programs
    await page.click('text=Programme');
    await expect(page).toHaveURL(/.*programme/);
    
    // Should show programs page
    await expect(page.locator('h1')).toContainText('Personalisiertes Programm');
  });
});

