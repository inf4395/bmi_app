import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/.*anmeldung/);
    
    // Go to registration
    await page.click('text=Jetzt registrieren');
    await expect(page).toHaveURL(/.*registrierung/);
    
    // Fill registration form
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard after successful registration
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Willkommen');
  });

  test('should login with existing user', async ({ page }) => {
    // First register a user
    await page.goto('/registrierung');
    
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    await page.fill('input[name="name"]', 'Login Test User');
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    
    // Logout
    await page.click('text=Abmelden');
    await expect(page).toHaveURL(/.*anmeldung/);
    
    // Login again
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Willkommen');
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/anmeldung');
    
    await page.fill('input[name="email"]', 'nonexistent@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('.error-message')).toBeVisible({ timeout: 5000 });
  });
});

