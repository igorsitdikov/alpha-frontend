import Repository from './Repository';

const resource = '/objects';

export default {
  get(id) {
    return Repository.get(`${resource}/object/${id}`);
  },
  getAll() {
    return Repository.get(`${resource}`);
  },
  // eslint-disable-next-line camelcase
  create(name, project, parent_id, user_id, queries) {
    return Repository.post(`${resource}`, {
      name, project, parent_id, user_id, queries,
    });
  },
  fetch(id) {
    Repository.patch(`${resource}`, { id });
  },
};
