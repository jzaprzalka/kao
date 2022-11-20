import {describe, expect, it} from "@jest/globals";
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import { api } from 'boot/axios';

installQuasarPlugin();

describe('API', function () {
  const barcode = "5449000131836";
  const product = "Coca Cola Zero";
  const langCode = "pl";

  it("Fetches product by barcode", async () => {
    let response = await api.get(`api/v2/product/${barcode}`);
    let data = response.data;
    expect(data['product']['product_name']).toBe(product);
  });

  it("Fetches languages list", async () => {
    let response = await api.get(`data/taxonomies/languages.json`);
    let data = response.data;
    expect(data).toBeTruthy();
  });

  it("Fetches product in different language", async () => {
    api.defaults.baseURL = `https://${langCode}.openfoodfacts.org/`
    let response = await api.get(`api/v2/product/${barcode}`);
    let data = response.data;
    expect(data['product']['product_name']).toBe(product);
  });
});
