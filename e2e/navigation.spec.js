import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Register a fresh user and land on BMI page
    await page.goto('/registrierung');

    const timestamp = Date.now();
    const testEmail = `navtest${timestamp}@example.com`;

    await page.fill('input[name="name"]', 'Nav Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // After authentication, user should land on /bmi
    await expect(page).toHaveURL(/.*\/bmi/, { timeout: 10000 });
  });

  test('should navigate between all pages', async ({ page }) => {
    // Dashboard
    await page.click('text=Dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('h1')).toContainText('Willkommen');

    // BMI Calculator
    await page.click('text=BMI Rechner');
    await expect(page).toHaveURL(/.*\/bmi/);
    await expect(page.locator('h1')).toContainText(/BMI/i);

    // Statistics
    await page.click('text=Statistiken');
    await expect(page).toHaveURL(/.*statistiken/);
    await expect(page.locator('h1')).toContainText(/Statistiken/i);

    // Programs
    await page.click('text=Programme');
    await expect(page).toHaveURL(/.*programme/);
    await expect(page.locator('h1')).toContainText(/Programm/i);

    // Profile - use getByRole for more reliable selection
    const profilLink = page.getByRole('link', { name: 'Profil' });
    await profilLink.waitFor({ state: 'visible' });
    await profilLink.click();
    await expect(page).toHaveURL(/.*profil/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /Mein Profil/i })).toBeVisible({ timeout: 5000 });
  });

  test('should logout and redirect to login', async ({ page }) => {
    await page.click('text=Abmelden');

    // Should redirect to login page
    await expect(page).toHaveURL(/.*anmeldung/);

    // Should not be able to access protected routes after logout
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*anmeldung/);

    await page.goto('/bmi');
    await expect(page).toHaveURL(/.*anmeldung/);
  });
});
