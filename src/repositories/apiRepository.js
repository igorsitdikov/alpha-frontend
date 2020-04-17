import Repository from './Repository';

const resource = '/api';

export default {
  get(id) {
    return Repository.get(`${resource}/${id}`);
  },
};
