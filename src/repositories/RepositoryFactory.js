import objectsRepository from './objectsRepository';
import entriesRepository from './entriesRepository';
import usersRepository from './usersRepository';
import gisRepository from './gisRepository';

const repositories = {
  objects: objectsRepository,
  entries: entriesRepository,
  users: usersRepository,
  gis: gisRepository,
};

const RepositoryFactory = {
  get: (name) => repositories[name],
};

export default RepositoryFactory;

// export { RepositoryFactory as default };
