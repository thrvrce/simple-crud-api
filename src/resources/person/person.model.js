import { v4 as uuidV4, validate } from 'uuid';
import { isNOtNullish } from '../../utils/checkers.js';

class Person {
  constructor({ name, age, hobbies }) {
    this.id = uuidV4();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  static isIdValid(id) {
    return validate(id);
  }

  static isValidDataForCreateNewPerson(personsData = {}) {
    const isNameValid = personsData.name && typeof personsData.name === 'string';
    const isAgeValid = isNOtNullish(personsData.age) && typeof personsData.age === 'number' && !Number.isNaN(personsData.age);
    const isHobbiesValid = personsData.hobbies && Array.isArray(personsData.hobbies) && personsData.hobbies.every((hobby) => typeof hobby === 'string');

    return isNameValid && isAgeValid && isHobbiesValid;
  }
}

export default Person;
