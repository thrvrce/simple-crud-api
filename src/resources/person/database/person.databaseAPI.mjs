import personsDataBase from './persons.database.mjs';

const getAllPersons = () => personsDataBase;

const getPersonById = (id) => personsDataBase.filter((person) => person.id === id)?.[0];

const insertNewPerson = (newPerson) => personsDataBase.push(newPerson);

const patchPersonById = (id, updatedPerson) => {
  const personsIndex = personsDataBase.findIndex((person) => person.id === id);
  personsDataBase[personsIndex] = updatedPerson;
};

const deletePersonById = (id) => {
  const personsIndex = personsDataBase.findIndex((person) => person.id === id);
  if (personsIndex !== -1) {
    personsDataBase.splice(personsIndex, 1);
    return true;
  }

  return false;
};

const personsDatabaseApi = {
  getAllPersons,
  getPersonById,
  insertNewPerson,
  patchPersonById,
  deletePersonById,
};

export default personsDatabaseApi;
