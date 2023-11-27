import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      const userName = this.loginForm.value.userName;
      const password = this.loginForm.value.password;
      this.authService.autenticar(userName, password).subscribe({
        next: (value) => {
          this.toastr.success('Autenticado com sucesso.', ' Autenticado!' );          
          this.router.navigateByUrl('/')
          this.loginForm.reset();
        },
        error: (err) => {
          this.toastr.error('Problema na autenticação.', ' Erro!' );          
        },
      })
    }
  }
}
