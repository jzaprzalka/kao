import {describe, expect, it} from "@jest/globals";
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import SearchPage from "pages/product/SearchPage";

installQuasarPlugin();

describe('Barcode input', function () {
  const wrapper = mount(SearchPage);

  it("accepts barcode input", async () => {
    const barcode = "5449000131836";
    const barcode_input = wrapper.find("input[name=barcode_input]");
    await barcode_input.setValue(barcode);
    expect(wrapper.vm.barcode).toBe(barcode);
  });
});
