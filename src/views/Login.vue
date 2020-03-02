<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card :elevation="hover ? 16 : 2" class="mx-auto">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    href="https://manpowergroupcolombia.co/soluciones/experis/"
                    target="_blank"
                    v-on="on"
                  >
                    <img
                      src="https://manpowergroupcolombia.co/wp-content/uploads/logo-footer-e1576004887974.png"
                      alt="John"
                    />
                  </v-btn>
                </template>
                <span>Experis ManpowerGroup</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-row align="center" justify="center" class="ma-4 pa-4">
                <v-img
                  src="./../assets/EXP_BE_Logo_RS_HOR_MC_RGB_300dpi-300x94.png"
                  width="300"
                  height="94"
                  max-width="300"
                  max-height="94"
                ></v-img>
              </v-row>

              <v-form ref="form_login" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="login.email"
                  label="Email"
                  name="email"
                  :rules="emailRules"
                  prepend-icon="person"
                  type="text"
                />

                <v-text-field
                  v-model="login.password"
                  label="Password"
                  name="password"
                  :rules="passwordRules"
                  prepend-icon="lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <!--v-spacer /-->
              <v-row align="center" justify="center">
                <v-btn
                  color="primary"
                  x-large
                  rounded
                  :loading="loading"
                  @click.prevent="handleLoginFormSubmit"
                >
                  <v-icon left>fa-sign-in-alt</v-icon>Login
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    isLoading: false,
    disabled: true,
    login: {
      email: "monkey.velasquez.1982@gmail.com",
      password: "experis"
    },
    passwordRules: [
      v => !!v || "Password es requerido",
      v => (v || "").indexOf(" ") < 0 || "Espacios no son permitidos",
      v => (v && v.length >= 5) || "Password debe tener 6 o mas caractares"
    ],
    emailRules: [
      v => !!v || "Email es requerido",
      v => (v || "").indexOf(" ") < 0 || "Espacios no son permitidos",
      v => /.+@.+/.test(v) || "Email debe ser valido"
    ]
  }),
  methods: {
    handleLoginFormSubmit() {
      //console.log("Login...");
      if (this.$refs.form_login.validate()) {
        this.loading = true;
        const postData = {
          email: this.login.email,
          password: this.login.password
        };

        this.$store.dispatch("login", {
          postData
        });

        this.loading = false;
      } else {
        this.loading = false;
        /*this.isLoading = false;*/
        console.log("no pasaste la validacion");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
