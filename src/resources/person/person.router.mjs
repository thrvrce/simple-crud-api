import {Router} from 'express';
import {getAllPersons, getPersonById} from './person.service.mjs';
import createHttpError from '../../utils/createHttpError.mjs';
const personRouter = Router({mergeParams: true});

personRouter.get('/', async (req, res, next) => {
  try {
    const persons = getAllPersons();
  res.status(200)
  res.json(persons);
  } catch (err) {
    next(createHttpError(500, 'Internal Server Error'))
  }
})

personRouter.get('/:personId', async (req, res, next) => {
  try {
  const persons = getPersonById(req.params.personId);
  res.status(200)
  res.json(persons);
} catch (err) {
  next(createHttpError(500, 'Internal Server Error'))
}
})

export default personRouter;