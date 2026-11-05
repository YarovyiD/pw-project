import {Locator, Page, expect } from '@playwright/test'

export default class InventoryPage {
    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async verifyPageLink():Promise<void>{
        await expect(this.page).toHaveURL(/inventory\.html/);
    }
}