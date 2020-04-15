import objectsRepository from './objectsRepository';
import entriesRepository from './entriesRepository';
import usersRepository from './usersRepository';
import gisRepository from './gisRepository';
import chartsRepository from './chartsRepository';

const repositories = {
  objects: objectsRepository,
  entries: entriesRepository,
  users: usersRepository,
  gis: gisRepository,
  charts: chartsRepository,
};

const RepositoryFactory = {
  get: (name) => repositories[name],
};

export default RepositoryFactory;

// export { RepositoryFactory as default };
