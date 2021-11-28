import { v4 as uuidV4, validate } from 'uuid';

class Person {
  constructor(name, age, hobbies) {
    this.id = uuidV4();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  static isIdValid(id) {
    return validate(id);
  }
}

export default Person;
