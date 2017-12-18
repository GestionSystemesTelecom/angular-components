import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { BusyComponent, BusyService } from './index';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: Busy', () => {

    let component: BusyComponent;
    let busyService: BusyService;
    let fixture: ComponentFixture<BusyComponent>;
    let divEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BusyComponent],
            providers: [BusyService],
            imports: [BrowserAnimationsModule],
        });

        // BusyService provided to the TestBed
        busyService = TestBed.get(BusyService);

        // create component and test fixture
        fixture = TestBed.createComponent(BusyComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        divEl = fixture.debugElement.query(By.css('div'));
    });

    it('Check default value', () => {
        expect(component['minTTL']).toBe(400);
        expect(component['startCount']).toBe(0);
        expect(component['firstStartTime']).toBe(0);
        expect(component['state']).toBe('hide');
    });

    it('Check show and hide values', (done) => {
        expect(component['startCount']).toBe(0);
        expect(component['firstStartTime']).toBe(0);
        expect(component['state']).toBe('hide');

        fixture.detectChanges();
        busyService.show();

        expect(component['startCount']).toBe(1);
        expect(component['firstStartTime']).toBeGreaterThan(1);
        expect(component['state']).toBe('show');

        busyService.hide();

        expect(component['startCount']).toBeLessThan(1);
        expect(component['firstStartTime']).toBeGreaterThan(1);
        expect(component['state']).toBe('show');

        setTimeout(() => {
            expect(component['startCount']).toBeLessThan(1);
            expect(component['firstStartTime']).toBe(0);
            expect(component['state']).toBe('hide');
            done();
        }, 400);

    });
});
