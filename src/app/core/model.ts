export class User {
  id: number | null;
  nome: string;
  cpf: string;
  email: string;
  senha: string;

  constructor(
    id: number | null,
    nome: string,
    cpf: string,
    email: string,
    senha: string
  ) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.email = email;
      this.senha = senha;
  }
}
export class Movie {
  id: number | null;
  name: string;
  synopsis: String;
  catMovie: CatMovie;

  constructor(
    id: number | null,
    name: string,
    synopsis: String,
    catMovie: CatMovie
  ) {
      this.id = id;
      this.name = name;
      this.synopsis = synopsis;
      this.catMovie = catMovie;
  }
}
export class CatMovie {
  id: number | null;
  description: string;

  constructor(
    id: number | null,
    descricao: string
  ) {
      this.id = id;
      this.description = descricao;
  }
}


/*
export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}



export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  anexo: string;
  urlAnexo: string;
}
*/
