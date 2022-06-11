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
