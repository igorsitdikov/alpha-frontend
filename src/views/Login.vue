<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email" >E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus>
      </div>
      <div>
        <label for="password" >Password</label>
        <div>
          <input id="password" type="password" v-model="password" required>
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RepositoryFactory from '../repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        const { data } = await usersRepository.login(this.email, this.password);
        const isAdmin = data.user.role;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('jwt', data.token);
        if (localStorage.getItem('jwt') != null) {
          this.$store.commit('setAuthorized', true);
          if (this.$route.params.nextUrl != null) {
            await this.$router.push(this.$route.params.nextUrl);
          } else if (isAdmin === 'admin') {
            this.$store.commit('setRole', true);
            await this.$router.push('admin');
          } else {
            await this.$router.push('about');
          }
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
