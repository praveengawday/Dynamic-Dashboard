import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAnalyticsComponent } from './dynamic-analytics.component';

describe('DynamicAnalyticsComponent', () => {
  let component: DynamicAnalyticsComponent;
  let fixture: ComponentFixture<DynamicAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
