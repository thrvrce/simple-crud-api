import Person from '../person.model.mjs';

const personWithConstantId = new Person({ name: 'Jane', age: 34, hobbies: ['footbal', 'swimming'] });
personWithConstantId.id = '6a0e7516-8504-4ba1-b81d-431ccb681920';
const personsDataBase = [
  new Person({ name: 'Andrew', age: 32, hobbies: ['cycling', 'poker'] }),
  new Person({ name: 'Jane', age: 33, hobbies: ['golf', 'swimming'] }),
  personWithConstantId,
];

export default personsDataBase;
