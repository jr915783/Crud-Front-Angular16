import { Component, Inject, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/core/types/type';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.scss']
})

export class ExcluirTarefaComponent implements OnInit {   
  
  constructor(
    private tareService: TarefaService,   
    public dialog: MatDialog,    
    public dialogRef: MatDialogRef<ExcluirTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {}

  cancelar(): void {       
    this.dialogRef.close();
  }  

  excluirTarefa() {
    
      this.tareService.excluirTarefa(this.data.id).subscribe( {
        next: (value) => {
          this.toastr.success('Excluido com Sucesso.', 'Excluido!' );
                  
        },
        error: (err) => {
          this.toastr.error('Erro ao tentar excluir.', 'Erro!' );
        },
      })      
      this.cancelar();
    }
  }




