import personsDataBase from './persons.database.mjs';

const getAllPersons = () => personsDataBase;

const getPersonById = (id) => personsDataBase.filter((person) => person.id === id)?.[0];

const insertNewPerson = (newPerson) => personsDataBase.push(newPerson);

const patchPersonById = (id, updatedPerson) => {
  const personsIndex = personsDataBase.findIndex((person) => person.id === id);
  personsDataBase[personsIndex] = updatedPerson;
};

const personsDatabaseApi = {
  getAllPersons,
  getPersonById,
  insertNewPerson,
  patchPersonById,
};

export default personsDatabaseApi;
