import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTarefaComponent } from './criar-tarefa.component';

describe('ExcluirPensamentoComponent', () => {
  let component: CriarTarefaComponent;
  let fixture: ComponentFixture<CriarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
