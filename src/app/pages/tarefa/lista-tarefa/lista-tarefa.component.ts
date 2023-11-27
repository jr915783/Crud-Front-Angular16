import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { Pagination, Tarefa } from 'src/app/core/types/type';
import { CriarTarefaComponent } from '../criar-tarefa/criar-tarefa.component';
import { ExcluirTarefaComponent } from '../excluir-tarefa/excluir-tarefa.component';
import { DetalheTarefaComponent } from '../detalhe-tarefa/detalhe-tarefa.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';


@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.component.html',
  styleUrls: ['./lista-tarefa.component.scss']
})
export class ListaTarefaComponent implements OnInit {

  title: string = "Lista de tarefas";
  listaTarefas: Tarefa[] = [];
  paginaAtual: number = 1;
  haMaisFavoritos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;
  listaFavoritos: Tarefa[] = []
  titulo: string = 'Meu Mural';
  filtroGrid: string = "";
  dadosLista: string = "Não existe dados a serem exibidos";
  filtroNaoEncotrado: boolean = false;
  pagination = {} as Pagination;
  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private service: TarefaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.pagination = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 1,
    } as Pagination;

    this.listarTarefas();
    this.verificarLista();
  }

  verificarLista() {
    this.listaTarefas.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
  }

  abrirModalCriarTarefa(): void {
    const dialogRef = this.dialog.open(CriarTarefaComponent, {
      width: '650px',
      height: '420px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTarefas();
    });
  }

  abrirModalExcluirTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(ExcluirTarefaComponent, {
      width: '500px',
      height: '240px',
      data: tarefa
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTarefas();
    });
  }

  abrirModalDetalheTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(DetalheTarefaComponent, {
      width: '600px',
      height: '300px',
      data: tarefa
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTarefas();
    });
  }

  listarTarefas() {
    this.service.listarTarefa().subscribe(() => {
      this.verificarLista();
    })

    this.service
      .listarTarefa(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (paginatedResult: any) => {
          this.listaTarefas = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
          this.listaTarefas.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
        },
        (error: any) => {}
      )}

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.listarTarefas();
  }


  filtrarGrid(evt: any) { 

    if (this.termoBuscaChanged.observers.length === 0) {     
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {          
          this.service
            .listarTarefa(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: any) => {
                this.listaTarefas = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
                this.listaTarefas.length == 0 ? this.filtroNaoEncotrado = true : this.filtroNaoEncotrado = false;
              },
              (error: any) => {               
                this.toastr.error('Erro ao Carregar os Tarefas', 'Erro!');
              }
            )            
        });       
    }
    this.termoBuscaChanged.next(evt.value);
  }

  abrirModalEditarTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(CriarTarefaComponent, {
      width: '650px',
      height: '420px',
      data: {
        tarefa,
        tipo: 'editar',
        titulo: 'Editar Tarefa',
        tituloBotao: 'Salvar',
        corBotao: 'success'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTarefas();
    });
  }

  alterStatusTarefa(tarefa : Tarefa){
    tarefa.completed = false;
    this.service.editarTarefa(tarefa).subscribe({
      next: (value) => {
        this.toastr.success('Editado com Sucesso.', ' Editado!' );
        this.listarTarefas();
      },
      error: (err) => {           
        this.toastr.error('Erro ao tentar Editar.', ' Erro!' );
      },     
    })    
  }
}


