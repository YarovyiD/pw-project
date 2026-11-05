import {Locator, Page, expect } from '@playwright/test'

export default class LoginPage {
    readonly page:Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly loginLogo: Locator;
    
    constructor(page:Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByRole('alert');
        this.loginLogo = page.locator('.login_logo');
    }

    async verifyLoginElements(): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginLogo).toHaveText('Swag Labs');
    } 

    async login(userName: string = '', password: string = ''): Promise<void> {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
    async verifyErrorMessage(errorText: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(errorText);
    }
} 