import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login
    await page.goto('/registrierung');
    
    const timestamp = Date.now();
    const testEmail = `navtest${timestamp}@example.com`;
    
    await page.fill('input[name="name"]', 'Nav Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('should navigate between all pages', async ({ page }) => {
    // Dashboard
    await page.click('text=Dashboard');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Willkommen');
    
    // BMI Calculator
    await page.click('text=BMI Rechner');
    await expect(page).toHaveURL(/.*bmi/);
    await expect(page.locator('h1')).toContainText('BMI Rechner');
    
    // Statistics
    await page.click('text=Statistiken');
    await expect(page).toHaveURL(/.*statistiken/);
    await expect(page.locator('h1')).toContainText('Statistiken');
    
    // Programs
    await page.click('text=Programme');
    await expect(page).toHaveURL(/.*programme/);
    await expect(page.locator('h1')).toContainText('Personalisiertes Programm');
    
    // Profile
    await page.click('text=Profil');
    await expect(page).toHaveURL(/.*profil/);
    await expect(page.locator('h1')).toContainText('Mein Profil');
  });

  test('should logout and redirect to login', async ({ page }) => {
    await page.click('text=Abmelden');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/.*anmeldung/);
    
    // Should not be able to access protected routes
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*anmeldung/);
  });
});

