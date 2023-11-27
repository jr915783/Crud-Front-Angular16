import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefaComponent } from './lista-tarefa.component';

describe('ListaTarefaComponent', () => {
  let component: ListaTarefaComponent;
  let fixture: ComponentFixture<ListaTarefaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTarefaComponent]
    });
    fixture = TestBed.createComponent(ListaTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
