import { test, expect } from '@playwright/test';

test('перевірка доступу до секрету', async () => {
  const token = process.env.MY_SECRET_TOKEN;
  console.log('Секрет доступний:', token ? 'ТАК ✅' : 'НІ ❌');
  expect(token).toBeTruthy();
});