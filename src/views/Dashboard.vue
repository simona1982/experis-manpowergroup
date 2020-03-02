<template>
  <v-app id="inspire">
    <!-- NAVIGATION -->
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      clipped
      app
      dark
      :src="bg"
    >
      <!--v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Categorias
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item-->

      <v-divider></v-divider>

      <v-list shaped>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="{ name: item.name_route }"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- APP BAR -->
    <v-app-bar
      app
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="color"
    >
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              v-on="on"
            ></v-app-bar-nav-icon>
          </template>
          <span>Click</span>
        </v-tooltip>
        <v-toolbar-title>Experis</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img
                :src="require('@/assets/profile.jpg')"
                alt="profile"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <span>Andrés Velásquez Delgado</span>
      </v-tooltip>
      <v-btn icon large @click="handleLogout">
        <v-icon>fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- CONTENT -->
    <v-container>
      <router-view></router-view>
      <!--HelloWorld /-->
      <!--v-container class="fill-height" fluid-->
      <!--v-row align="start" justify="start" color="red">
        <v-col xs="12" sm="12" md="4" lg="4" xl="4" class="ml-0">
          <CategoryList />
        </v-col>

        <v-col xs="12" sm="12" md="8" lg="8" xl="8" class="ml-0">
          <UserList />
        </v-col>
      </v-row-->
      <!--/v-container-->
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    background: true,
    color: "primary",
    colors: ["primary", "blue", "success", "red", "teal"],
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "mdi-history",
        text: "Aspirantes",
        name_route: "dashboard.aspirants"
      },
      {
        icon: "fa-handshake",
        text: "Entrevistas",
        name_route: "dashboard.interviews"
      }
    ]
  }),
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  created() {
    this.$store.dispatch("getAllUsers");
    console.log("created");
  },
  methods: {
    handleLogout() {
      window.localStorage.removeItem("authUser");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
