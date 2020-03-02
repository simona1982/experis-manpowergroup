<template>
  <div>
    <v-row align="start" justify="start" color="red">
      <v-col xs="12" sm="12" md="4" lg="4" xl="4" class="ml-0">
        <CategoryList />
      </v-col>

      <v-col xs="12" sm="12" md="8" lg="8" xl="8" class="ml-0">
        <UserList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryList from "./../components/categoy/CategoryList";
import UserList from "./../components/user/UserList";
export default {
  components: { CategoryList, UserList },
  created() {
    this.$store.dispatch("noUsers");
  }
};
</script>

<style lang="scss" scoped></style>
