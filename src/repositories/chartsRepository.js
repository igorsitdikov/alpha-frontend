import Repository from './Repository';

const resource = '/chart';

export default {
  show(id, keywords) {
    return Repository.post(`${resource}`, {
      id, keywords,
    });
  },
};
