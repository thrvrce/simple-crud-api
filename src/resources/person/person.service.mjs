import Person from './person.model.mjs';
import personsDatabaseApi from './database/person.databaseAPI.mjs';

export const getAllPersons = () => (
  { statusCode: 200, payload: { persons: personsDatabaseApi.getAllPersons() } });

export const getPersonById = (id) => {
  if (!Person.isIdValid(id)) {
    return { statusCode: 400, payload: { message: 'uuid is invalid' } };
  }
  const person = personsDatabaseApi.getPersonById(id);

  if (!person.length) {
    return { statusCode: 404, payload: { message: 'person with given uuid was not found' } };
  }

  return { statusCode: 200, payload: { person } };
};

export const createNewPerson = (personsData) => {
  if (Person.isValidDataForCreateNewPerson(personsData)) {
    const newPerson = new Person(personsData);
    personsDatabaseApi.insertNewPerson(newPerson);
    return { statusCode: 201, payload: { newPerson } };
  }
  return { statusCode: 400, payload: { message: 'Invalid person\'s data' } };
};
