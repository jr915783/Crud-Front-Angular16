import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTarefaComponent } from './detalhe-tarefa.component';

describe('ExcluirPensamentoComponent', () => {
  let component: DetalheTarefaComponent;
  let fixture: ComponentFixture<DetalheTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
