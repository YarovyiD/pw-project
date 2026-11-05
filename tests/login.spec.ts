import { usersData } from "../data/userData";
import { test } from '../fixtures/pageFixtures'
import { errorMessages } from '../data/userData';

test.describe('Check login with different users', () => {

 test.beforeEach(async ({ page }) => {
    await page.goto('/');
 });

 test('Successful login scenario', async ({ loginPage, inventoryPage }) => {
    await loginPage.verifyLoginElements();
    await loginPage.login(usersData.standard.username, usersData.standard.password);
    await inventoryPage.verifyPageLink();
    });

 test('Locked oud login scenario', async ({ loginPage }) => {
    await loginPage.login(usersData.locked.username, usersData.locked.password);
    await loginPage.verifyErrorMessage(errorMessages.lockedOut);
    });

test('Empty username field scenario', async ({ loginPage }) => {
    await loginPage.login('', usersData.standard.password);
    await loginPage.verifyErrorMessage(errorMessages.userNameRequired);
    });

test('Empty password field scenario', async ({ loginPage }) => {
    await loginPage.login(usersData.standard.username);
    await loginPage.verifyErrorMessage(errorMessages.passwordRequired);
    });
});