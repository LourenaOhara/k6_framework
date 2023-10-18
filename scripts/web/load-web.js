import { chromium } from 'k6/experimental/browser';

export const options = {
    vus: 1,
    duration: '5s'
};

export default async function () {
    const browser = chromium.launch({ geadless: true });
    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        page.screenshot({path: 'screenshot.png'})
    } finally {
        page.close();
    }
};

//enviroment para indentificar que é um script web: K6_BROWSER_ENABLE=true k6 run load-web.js