import { Builder, By, Key, until } from 'selenium-webdriver';

if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Sauce Labs user name or access key not set.')
    process.exit(1);
}

// We connect to Sauce Labs's Selenium service
const server = process.env.SAUCE_URL || 'https://ondemand.us-west-1.saucelabs.com/wd/hub';

// Sauce Labs authentication and options
const sauceOptions = {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    name: 'First browser automation'
};

let browser = process.env.BROWSER || 'chrome';
// Microsoft uses a longer name for Edge
if (browser == 'edge') {
    browser = 'MicrosoftEdge';
}

// Set up a new browser session
let driver = await new Builder()
    .usingServer(server)
    .forBrowser(browser)
    .setCapability('sauce:options', sauceOptions)
    .build();

try {
    // Automate DuckDuckGo search
    await driver.get('https://duckduckgo.com/');

    // Search for 'Selenium dev'
    const searchBox = await driver.findElement(By.id('searchbox_input'));
    await searchBox.sendKeys('Selenium dev', Key.ENTER);

    // Wait until the result page is loaded
    await driver.wait(until.elementLocated(By.css('#more-results')));
} finally {
    // Close the browser
    await driver.quit();
}
