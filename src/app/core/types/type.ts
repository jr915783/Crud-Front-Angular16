
export interface PessoaUsuaria {
    userName: string;
    password: string;
    email: string;  
}

export class Tarefa {
    id!: number;
    title!: string;
    description!: string;  
    completed !: boolean;
    userId!:  number     
}

export class Pagination {
    currentPage!: number;
    itemsPerPage!: number;
    totalItems!: number;
    totalPages!: number;
  }
  
  export class PaginatedResult<T> {
    result: T | undefined; ;
    pagination!: Pagination;
  }

  

