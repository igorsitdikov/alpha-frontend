<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="default"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    :rules="emailRules"
                    name="login"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    :rules="passwordRules"
                    name="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="default" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RepositoryFactory from '../repositories/RepositoryFactory';

const usersRepository = RepositoryFactory.get('users');

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    valid: true,
    emailRules: [
      (v) => !!v || 'E-mail is required',
      // eslint-disable-next-line no-useless-escape
      (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
  }),
  methods: {
    async submit(e) {
      if (this.$refs.form.validate()) {
        e.preventDefault();
        const { data } = await usersRepository.login(this.email, this.password);
        const isAdmin = data.user.role;
        // eslint-disable-next-line no-underscore-dangle
        this.$store.commit('setUserId', data.user._id);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('jwt', data.token);
        if (localStorage.getItem('jwt') != null) {
          this.$store.commit('setAuthorized', true);
          if (this.$route.params.nextUrl != null) {
            await this.$router.push(this.$route.params.nextUrl);
          } else if (isAdmin === 'admin') {
            this.$store.commit('setRole', true);
            await this.$router.go({ path: '/', force: true });
          } else {
            await this.$router.go({ path: '/', force: true });
          }
        }
        this.$root.$emit('showTree');
      }
    },
  },
};
</script>

<style scoped>

</style>
