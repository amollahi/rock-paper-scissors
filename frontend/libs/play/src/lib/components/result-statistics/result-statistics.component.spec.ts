import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultStatisticsComponent } from './result-statistics.component';

describe('ResultStatisticsComponent', () => {
  let component: ResultStatisticsComponent;
  let fixture: ComponentFixture<ResultStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
