import Person from './person.model.mjs';
import personsDatabaseApi from './database/person.databaseAPI.mjs';

export const getAllPersons = () => personsDatabaseApi.getAllPersons();
export const getPersonById = (id) => {
  if (!Person.isIdValid(id)) {
    return { statusCode: 400, message: 'uuid is invalid' };
  }
  const person = personsDatabaseApi.getPersonById(id);

  if (!person.length) {
    return { statusCode: 404, message: 'person with given uuid was not found' };
  }

  return { statusCode: 200, person };
};
