const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Automation Test", function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Sukses Login", async function () {
    await driver.get("https://www.saucedemo.com/");

    await driver.findElement(By.id("user-name"))
      .sendKeys("standard_user");

    await driver.findElement(By.id("password"))
      .sendKeys("secret_sauce");

    await driver.findElement(By.id("login-button")).click();

    const title = await driver.findElement(By.className("title")).getText();
    assert.strictEqual(title, "Products");
  });

  it("Urutkan Produk dari A-Z", async function () {
    const sortDropdown = await driver.findElement(
        By.className("product_sort_container")
    );

    // Pilih sorting A-Z (value = az)
    await sortDropdown.findElement(By.css('option[value="az"]')).click();

    await driver.wait(async () => {
        const items = await driver.findElements(By.className("inventory_item_name"));
        const text = await items[0].getText();
        return text === "Sauce Labs Backpack";
    }, 5000);

    const products = await driver.findElements(By.className("inventory_item_name"));
    const firstProduct = await products[0].getText();

    assert.strictEqual(firstProduct, "Sauce Labs Backpack");
});
});