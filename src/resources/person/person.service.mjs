import Person from './person.model.mjs';
import personsDatabaseApi from './database/person.databaseAPI.mjs';

export const getAllPersons = () => (
  { statusCode: 200, payload: { persons: personsDatabaseApi.getAllPersons() } });

export const getPersonById = (id) => {
  if (!Person.isIdValid(id)) {
    return { statusCode: 400, payload: { message: 'uuid is invalid' } };
  }
  const person = personsDatabaseApi.getPersonById(id);

  if (!person) {
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

export const patchPersonById = (id, newData) => {
  if (!Person.isIdValid(id)) {
    return { statusCode: 400, payload: { message: 'uuid is invalid' } };
  }

  const person = personsDatabaseApi.getPersonById(id);

  if (!person) {
    return { statusCode: 404, payload: { message: 'person with given uuid was not found' } };
  }
  const valuesForUpdate = Object.keys(newData);
  valuesForUpdate.forEach((valueName) => { person[valueName] = newData[valueName]; });
  personsDatabaseApi.patchPersonById(id, person);

  return { statusCode: 200, payload: { person } };
};

export const deletePersonById = (id) => {
  if (!Person.isIdValid(id)) {
    return { statusCode: 400, payload: { message: 'uuid is invalid' } };
  }

  const person = personsDatabaseApi.getPersonById(id);

  if (!person) {
    return { statusCode: 404, payload: { message: 'person with given uuid was not found' } };
  }

  const result = personsDatabaseApi.deletePersonById(id);

  if (!result) {
    return { statusCode: 404, payload: { message: 'person with given uuid was not found' } };
  }

  return { statusCode: 204, payload: { message: `Person with id ${id} was deleted` } };
};
