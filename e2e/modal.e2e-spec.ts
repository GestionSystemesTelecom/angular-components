import { browser, by, element } from 'protractor';

/*
 Use console.info for debuging
*/

describe('Modal', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should load simple modal', async (done) => {
        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeFalsy();

        element(by.xpath('//button[text()="Launch a modal with a component inside"]')).click();

        expect(await element(by.xpath('//*[@id="AnExpliciteId"]')).isDisplayed()).toBeTruthy();

        element(by.xpath('//button[text()="Close"]')).click();

        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeFalsy();

        browser.manage().logs().get('browser').then(async (browserLog) => {
            expect(browserLog.filter((x) => x.message.indexOf('Action closed modal') > 0).length > 0).toBeTruthy();
            done();
        });
    });

    it('should load modal with property', async (done) => {

        element(by.xpath('//a[text()="Lazy Module"]')).click();

        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeFalsy();

        element(by.xpath('//button[text()="Open this wonderfull Modal !"]')).click();

        expect(await element(by.xpath('//*[@id="lazy-modal-component"]')).isPresent()).toBeTruthy();

        element(by.xpath('//button[text()="Close"]')).click();

        browser.manage().logs().get('browser').then((browserLog) => {
            expect(browserLog.filter((x) => x.message.indexOf('aProperty : changed') > 0).length > 0).toBeTruthy();
            done();
        });
    });
});
