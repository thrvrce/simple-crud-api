import Person from '../person.model.mjs';

const personWithConstantId = new Person('Jane', 34, ['footbal', 'swimming']);
personWithConstantId.id = '6a0e7516-8504-4ba1-b81d-431ccb681920';
const personsDataBase = [
  new Person('Andrew', 32, ['cycling', 'poker']),
  new Person('Jane', 33, ['golf', 'swimming']),
  personWithConstantId
]

export default personsDataBase;