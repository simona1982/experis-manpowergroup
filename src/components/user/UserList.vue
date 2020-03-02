<template>
  <div>
    <v-card class="mx-auto" color="primary" dark>
      <v-card-title>
        <v-icon large left>
          fa-users
        </v-icon>
        <span class="title font-weight-black white--text"
          >Lista Aspirantes</span
        >
      </v-card-title>

      <v-card-text
        class="headline font-weight-bold"
        style="background-color:white;color: black;"
      >
        <v-row class="mt-4">
          <p
            v-if="!filteredUsers.length"
            class="cart-empty-text has-text-centered"
            style="color: #26c6da;"
          >
            Selecciona algunas tecnologias!
          </p>

          <v-col cols="12" v-else>
            <v-card
              class="mx-auto mt-2"
              v-for="(user, index) in filteredUsers"
              :key="index"
              color="#1F7087"
              dark
            >
              <v-card-text>
                <v-container>
                  <v-row align="start" justify="center">
                    <v-col md="6" lg="6" xl="6">
                      <div>{{ user.username }}</div>

                      <v-badge :content="`${user.id}`" color="green">
                        <p class="display-1">
                          {{ user.name }}
                        </p>
                      </v-badge>

                      <v-row>
                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">Email</span>
                          <p>
                            {{ user.email }}
                          </p>
                        </v-col>
                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">Telefono</span>
                          <p>
                            {{ user.phone }}
                          </p>
                        </v-col>

                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">Website</span>
                          <p>
                            {{ user.website }}
                          </p>
                        </v-col>
                      </v-row>

                      <span class="lime--text">Dirección</span>
                      <v-row>
                        <v-col md="3" lg="3" xl="3">
                          <span class="lime--text">Calle</span>
                          <p>
                            {{ user.address.street }}
                          </p>
                        </v-col>
                        <v-col md="3" lg="3" xl="3">
                          <span class="lime--text">Suite</span>
                          <p>
                            {{ user.address.suite }}
                          </p>
                        </v-col>
                        <v-col md="3" lg="3" xl="3">
                          <span class="lime--text">Ciudad</span>
                          <p>
                            {{ user.address.city }}
                          </p>
                        </v-col>
                        <v-col md="3" lg="3" xl="3">
                          <span class="lime--text">Zipcode</span>
                          <p>
                            {{ user.address.zipcode }}
                          </p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <GmapMap
                          :center="{
                            lat: parseFloat(user.address.geo.lat),
                            lng: parseFloat(user.address.geo.lng)
                          }"
                          :zoom="6"
                          style="width: 100%; height: 150px"
                        ></GmapMap>
                      </v-row>

                      <span class="lime--text mt-1">Compañia</span>
                      <v-row>
                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">Nombre</span>
                          <p>
                            {{ user.company.name }}
                          </p>
                        </v-col>
                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">catchPhrase</span>
                          <p>
                            {{ user.company.catchPhrase }}
                          </p>
                        </v-col>
                        <v-col md="4" lg="4" xl="4">
                          <span class="lime--text">bs</span>
                          <p>
                            {{ user.company.bs }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col md="6" lg="6" xl="6">
                      <v-container fluid>
                        <v-row justify="center">
                          <v-img
                            class="elevation-6"
                            max-height="462"
                            max-width="324"
                            :src="require('@/assets/IMG_1483.jpg')"
                          ></v-img>
                        </v-row>
                      </v-container>
                      <v-container>
                        <v-btn
                          block
                          lg
                          rounded
                          raised
                          color="cyan"
                          @click.stop="openDialog(user)"
                        >
                          Elegir
                        </v-btn>
                      </v-container>
                    </v-col>
                  </v-row>

                  <!-- DIALOG -->
                </v-container>
              </v-card-text>
              <!--v-card-actions>
                <v-btn color="deep-purple accent-4">
                  Elegir
                </v-btn>
              </v-card-actions-->
            </v-card>

            <!-- DIALOG -->
            <v-dialog v-model="dialog" max-width="700px">
              <v-card>
                <v-card-title color="primary" dark>
                  <span class="headline">Programación Entrevista</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col md="6">
                      <v-select
                        v-model="type_select"
                        :items="items"
                        label="Tipo *"
                        required
                      ></v-select
                    ></v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col md="6"
                      ><p>Fecha*</p>
                      <v-date-picker v-model="fecha_entrevista"></v-date-picker
                    ></v-col>
                    <v-col md="6">
                      <p>Hora*</p>
                      <v-time-picker v-model="hora_entrevista"></v-time-picker
                    ></v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-alert type="error" v-if="error">
                      Debe llenar todos los campos.
                    </v-alert>
                  </v-row>

                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false"
                    >Cerrar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="assignInterview"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- AQUI-TOY_-->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserList",
  data: () => ({
    userSelected: {},
    fecha_entrevista: new Date().toISOString().substr(0, 10),
    hora_entrevista: null,
    items: ["Presencial", "Telefónica", "Remota"],
    type_select: null,
    error: false,
    dialog: false
  }),
  computed: {
    //...mapGetters(["cartItems", "cartTotal", "cartQuantity"])
    ...mapGetters(["filteredUsers"])
  },
  methods: {
    openDialog(user) {
      this.userSelected = {};
      this.dialog = true;
      this.userSelected = user;
    },
    assignInterview() {
      if (
        this.type_select === null ||
        this.fecha_entrevista === null ||
        this.hora_entrevista === null
      ) {
        this.error = true;
        setTimeout(() => (this.error = false), 2000);

        return true;
      }

      this.dialog = false;

      this.userSelected.interview = {
        date: this.fecha_entrevista,
        time: this.hora_entrevista,
        type: this.type_select
      };

      this.$store.dispatch("saveInterview", {
        interview: this.userSelected
      });

      console.log(this.userSelected);
    }
  }
};
</script>

<style scoped>
#mapa {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>
