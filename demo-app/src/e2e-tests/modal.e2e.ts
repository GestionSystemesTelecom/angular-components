import { browser, by, element } from 'protractor';

describe('Modal', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should load simple modal', (done) => {
        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeFalsy();

        element(by.xpath('//button[text()="Launch a modal with a component inside"]')).click();

        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeTruthy();

        element(by.xpath('//button[text()="Close"]')).click();

        browser.manage().logs().get('browser').then((browserLog) => {
            expect(browserLog.filter((x) => x.message.indexOf('Action closed modal') > 0).length > 0).toBeTruthy();
            done();
        });
    });

    it('should load modal with property', (done) => {

        element(by.xpath('//a[text()="Lazy Module"]')).click();

        expect(element(by.xpath('//*[@id="AnExpliciteId"]')).isPresent()).toBeFalsy();

        element(by.xpath('//button[text()="Open this wonderfull Modal !"]')).click();

        expect(element(by.xpath('//*[@id="lazy-modal-component"]')).isPresent()).toBeTruthy();

        element(by.xpath('//button[text()="Close"]')).click();

        browser.manage().logs().get('browser').then((browserLog) => {
            expect(browserLog.filter((x) => x.message.indexOf('aProperty : changed') > 0).length > 0).toBeTruthy();
            done();
        });
    });
});
