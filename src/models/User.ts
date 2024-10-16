class User {
  public id: string;

  constructor(public name: string, public password: string) {
    this.id = crypto.randomUUID();
  }
}

export default User;
