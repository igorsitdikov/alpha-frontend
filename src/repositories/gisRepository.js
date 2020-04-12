import Repository from './Repository';

const resource = '/gis';

export default {
  getByObjectId(id) {
    return Repository.get(`${resource}/object/${id}`);
  },
  getAll() {
    return Repository.get(`${resource}`);
  },
};
