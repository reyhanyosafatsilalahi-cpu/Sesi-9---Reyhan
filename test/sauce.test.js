const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Automation Test - With Hooks", function () {
  this.timeout(30000);

  let driver;

  // 🔹 Run 1x sebelum semua test
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // 🔹 Run sebelum setiap test
  beforeEach(async function () {
    await driver.get("https://www.saucedemo.com/");
  });

  // 🔹 Run 1x setelah semua test
  after(async function () {
    await driver.quit();
  });

  it("Sukses Login", async function () {
    await driver.findElement(By.id("user-name"))
      .sendKeys("standard_user");

    await driver.findElement(By.id("password"))
      .sendKeys("secret_sauce");

    await driver.findElement(By.id("login-button")).click();

    const title = await driver.findElement(By.className("title")).getText();
    assert.strictEqual(title, "Products");
  });

  it("Urutkan Produk dari A-Z", async function () {
    // 🔹 LOGIN
    await driver.findElement(By.id("user-name"))
      .sendKeys("standard_user");

    await driver.findElement(By.id("password"))
      .sendKeys("secret_sauce");

    await driver.findElement(By.id("login-button")).click();

    // 🔹 Masuk halaman Products
    await driver.wait(
      until.elementLocated(By.className("title")),
      5000
    );

    const pageTitle = await driver.findElement(By.className("title"));
    await driver.wait(until.elementIsVisible(pageTitle), 5000);

    // 🔹 Cari dropdown sorting
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      5000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);

    await sortDropdown.findElement(By.css('option[value="az"]')).click();

    const products = await driver.findElements(By.className("inventory_item_name"));
    const firstProduct = await products[0].getText();

    assert.strictEqual(firstProduct, "Sauce Labs Backpack");
  });
});