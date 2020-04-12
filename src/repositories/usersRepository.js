import Repository from './Repository';

const resource = '/users';

export default {
  login(email, password) {
    return Repository.post(`${resource}/auth`, { email, password });
  },
};
