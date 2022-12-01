import {describe, expect, it} from "@jest/globals";
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
// import SearchPage from "pages/product/SearchPage";

installQuasarPlugin();

describe('Barcode input', function () {
  // const wrapper = mount(SearchPage);

  it("accepts barcode input", async () => {
    expect(true).toBe(true)
    const barcode = "5449000131836";
    // TODO
    // const barcode_input = wrapper.find("input[name=barcode_input]");
    // await barcode_input.setValue(barcode);
    // expect(wrapper.vm.barcode).toBe(barcode);
  });
});
