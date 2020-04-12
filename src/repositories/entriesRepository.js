import Repository from './Repository';

const resource = '/entries';

export default {
  getById(id) {
    return Repository.get(`${resource}/${id}`);
  },
  getAll() {
    return Repository.get(`${resource}`);
  },
  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  },
  getTrash() {
    return Repository.get(`${resource}/trash`);
  },
};
