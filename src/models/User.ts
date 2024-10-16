class User {
  id: string;
  name: string;
  password: string;
  wins: number;

  constructor(name: string, password: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.password = password;
    this.wins = 0;
  }
}

export default User;
