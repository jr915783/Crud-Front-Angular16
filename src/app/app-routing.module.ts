import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';
import { ListaTarefaComponent } from './pages/tarefa/lista-tarefa/lista-tarefa.component';

const routes: Routes = [
  {
    path: '',
    component: ListaTarefaComponent,
    canActivate: [authGuard]
  },  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'lista-tarefa',
    component: ListaTarefaComponent ,
    canActivate: [authGuard]   
  },
  { path: '**', 
  component: ListaTarefaComponent,
  canActivate: [authGuard]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
