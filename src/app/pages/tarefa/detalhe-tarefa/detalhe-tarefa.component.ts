import { Component, Inject, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/core/types/type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhe-tarefa',
  templateUrl: './detalhe-tarefa.component.html',
  styleUrls: ['./detalhe-tarefa.component.scss']
})

export class DetalheTarefaComponent implements OnInit {   
  
  constructor(       
    public dialog: MatDialog,    
    public dialogRef: MatDialogRef<DetalheTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa
  ) { }

  ngOnInit(): void {}

  cancelar(): void {       
    this.dialogRef.close();
  }  

}




