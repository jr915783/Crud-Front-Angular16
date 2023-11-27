import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  PaginatedResult, Tarefa } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiUrl}/Task/AddTask`, tarefa);
  }

  excluirTarefa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Task/DeletarTask/${id}`);
  }

  buscarTarefa(title: string): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/Task/GetTaskByName/${title}`);
  }

  listarTarefa(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Tarefa[]>> {
    const paginatedResult: PaginatedResult<Tarefa[]> = new PaginatedResult<Tarefa[]>();
    
    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());      
    }

    if (term != null && term != '')
      params = params.append('term', term)

    return this.http.get<PaginatedResult<Tarefa[]>>(`${this.apiUrl}/Task/ListTask`, {observe: 'response', params })
    .pipe(
      take(1),
      map((response : any) => {      
        paginatedResult.result = response.body;
        if(response.headers.has('Pagination')) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

  editarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/Task/UpdateTask`, tarefa);
  }

 

}
