export class User {
  id: number | null;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  idPosition: number;

  constructor(
    id: number | null,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    idPosition: number
  ) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.email = email;
      this.senha = senha;
      this.idPosition = idPosition;
  }
}
export class Movie {
  id: number | undefined;
  name: string;
  synopsis: String;
  catMovie: CatMovie;

  constructor(
    id: number | undefined,
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

export class MovieTheater {
  id: number | undefined;
  seatQuantity: number;
  identificationNumber: string;

  constructor(
    id: number | undefined,
    identificationNumber: string,
    seatQuantity: number
  ) {
      this.id = id;
      this.seatQuantity = seatQuantity;
      this.identificationNumber = identificationNumber;
  }
}

export class Session {
  id: number | null;
  movie: Movie;
  movieTheater: MovieTheater;
  dateTime: string;

  constructor(
    id: number | null,
    movie: Movie,
    movieTheater: MovieTheater,
    dateTime: string,
  ) {
      this.id = id;
      this.movie = movie;
      this.movieTheater = movieTheater;
      this.dateTime = dateTime;
  }
}

export class BodyRequestGetHours {
  id: number | null;
  date: String;

  constructor(
    id: number | null,
    date: string,

  ) {
      this.id = id;
      this.date = date;
  }
}

export class PositionCompany {
  id: number | null;
  description: String;

  constructor(
    id: number | null,
    description: string,

  ) {
      this.id = id;
      this.description = description;
  }
}



/*export class Lancamento {
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
