<template>
  <v-card class="mx-auto" color="primary">
    <v-card-title>
      <v-icon large left color="white">
        fa-code
      </v-icon>
      <span class="title font-weight-black white--text">Lista Tecnologias</span>
    </v-card-title>

    <v-card-text
      class="headline font-weight-bold"
      style="background-color:white;color: black;"
    >
      <v-row class="mt-4 ">
        <!--v-treeview
          v-model="selection"
          selection-type="independent"
          shaped
          :items="categoryItems"
          item-children="sublevels"
          :selectable="selectable"
          class="black--text"
          @input="updateProductList"
          light
        ></v-treeview-->
        <v-treeview
          v-model="selection"
          open-all
          selectable
          shaped
          selected-color="red"
          :items="items"
          @input="getUsersList"
        ></v-treeview>
      </v-row>
      <!-- AQUI-TOY_-->
    </v-card-text>
    <!--v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >Lista de Productos</v-list-item-title
        >
        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item-->
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    selection: [],
    items: [
      {
        id: 10,
        name: "Microsoft .Net",
        children: [
          { id: 1, name: "Asp.Net" },
          { id: 2, name: "MVVM" },
          { id: 3, name: "Ado.Net" },
          { id: 4, name: "Entity FrameWork" },
          { id: 5, name: "LinQ" }
        ]
      },
      {
        id: 20,
        name: "Oracle Java",
        children: [
          { id: 11, name: "Java Server Pages" },
          { id: 12, name: "Java Server Faces" },
          { id: 13, name: "Enterprise Java Beans" },
          { id: 14, name: "Java Persistence Api" },
          { id: 15, name: "Java Messaging Services" }
        ]
      }
    ]
  }),
  methods: {
    getUsersList() {
      const technologiesSelected = this.selection;

      if (technologiesSelected.length === 0) {
        this.$store.dispatch("noUsers");
        return true;
      }

      const arrayTechnologies = technologiesSelected.map(t =>
        t.toString().length === 2 ? Number(t.toString().slice(1)) : Number(t)
      );

      let hasEven = false;
      let hasOdd = false;

      //Tecnologias seleccionados tienen pares, impares o ambos
      arrayTechnologies.map(t =>
        t % 2 === 0 ? (hasEven = true) : (hasOdd = true)
      );

      this.$store.dispatch("getFilteredUsers", {
        even: hasEven,
        odd: hasOdd
      });
    }
  },
  computed: {
    ...mapState({
      users: state => state.allUsers
    }),
    usersAll() {
      return this.$store.state.allUsers;
    }
  }
  /*computed: {
    ...mapGetters(["categoryItems", "productItems"])
  },
  created() {
    this.$store.dispatch("getCategoryItems");
    this.$store.dispatch("getProductItems");
  },
  data: () => ({
    selection: [],
    selectable: true,
    selectedColor: "success"
  }),
  methods: {
    updateProductList() {
      const categoriesSelected = this.selection;

      this.$store.dispatch("getProductItemsByCategories", {
        categoriesSelected
      });
    }
  }*/
};
</script>

<style lang="scss" scoped></style>
