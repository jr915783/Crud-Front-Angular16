import { Component, Inject, OnInit } from '@angular/core';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.component.html',
  styleUrls: ['./criar-tarefa.component.scss']
})

export class CriarTarefaComponent implements OnInit {

  formulario!: FormGroup;
  titulo: string = "Criar Tarefa";
  tituloBotao: string = "Salvar";
  corBotao: string = "success";
  check : boolean = this.data?.tarefa?.completed != null ? this.data?.tarefa?.completed : false;
  mostrarCheck : boolean =  this.data?.tipo == 'editar' ? true : false;

  constructor(
    private tareService: TarefaService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CriarTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titulo = this.data?.titulo ? this.data?.titulo : "Criar Tarefa";
    this.tituloBotao = this.data?.tituloBotao ? this.data?.tituloBotao : "Salvar";
    this.corBotao = this.data?.corBotao ? this.data?.corBotao : "success";

    this.formulario = this.formBuilder.group({
      id: [this.data?.tarefa?.id],
      title: [this.data?.tarefa?.title, Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      description: [this.data?.tarefa?.description, Validators.compose([
        Validators.required,        
      ])],
      completed: [this.check]
    })
  }

  cancelar(): void {  
    this.dialogRef.close();
  }

  criarTarefa() {
    
    if (this.formulario.valid) {      
      if (this.data?.tipo == 'editar') {        
        this.tareService.editarTarefa(this.formulario.value).subscribe({
          next: (value) => {
            this.toastr.success('Editado com Sucesso.', ' Editado!' );
            
          },
          error: (err) => {           
            this.toastr.error('Erro ao tentar Editar.', ' Erro!' );
          },
          
        })
      } else {
        this.formulario.removeControl('id');
        this.tareService.cadastrarTarefa(this.formulario.value).subscribe({
          next: (value) => {
            this.toastr.success('Adicionado com Sucesso.', ' Adicionado!' );
          },
          error: (err) => {
            this.toastr.error('Erro ao tentar Adicionar.', ' Erro!' );
          },
        })        
      }
      this.cancelar();
    }
  }
}


