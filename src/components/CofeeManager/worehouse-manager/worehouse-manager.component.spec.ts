import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorehouseManagerComponent } from './worehouse-manager.component';

describe('WorehouseManagerComponent', () => {
  let component: WorehouseManagerComponent;
  let fixture: ComponentFixture<WorehouseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorehouseManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorehouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
