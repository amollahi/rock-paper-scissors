import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayErrorComponent } from './play-error.component';

describe('PlayErrorComponent', () => {
    let component: PlayErrorComponent;
    let fixture: ComponentFixture<PlayErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayErrorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PlayErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
