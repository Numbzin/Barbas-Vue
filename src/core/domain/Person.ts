export class Person {
  uid?: string;
  name: string;
  email: string;
  telephone: string;
  document?: string;
  gender?: string;
  photo?: string;
  typePerson: string; // "fisica" ou "juridica"
  typeAccess: string; // "cliente" ou "gestor"
  password: string;
  isActive: boolean;
  // address?: Address;
  // company?: Company;
  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.telephone = "";
    // this.document = "";
    // this.gender = "";
    // this.photo = "";
    this.isActive = true;
    this.typeAccess = "cliente";
    this.typePerson = "fisica";
    // this.address = new Address();
    // this.company = new Company();
  }
}

// export default new Person();
