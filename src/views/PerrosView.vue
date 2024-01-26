<template>
  <div class="dog-table">
    <h2>Gossos</h2>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Guia</th>
          <!-- Otros encabezados según tus necesidades -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="dog in dogs" :key="dog.id">
          <td>{{ dog.nombre }}</td>
          <td>{{ dog.dueño }}</td>
          <!-- Otras celdas según tus necesidades -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { query, collection, getDocs } from "firebase/firestore";
import db from "../services/firebase";

interface Dog {
  id: number;
  nombre: string;
  dueño: string;
  // Otros campos según tus necesidades
}

@Options({})
export default class PerrosTable extends Vue {
  dogs: Dog[] = [];

  async mounted() {
    // Configura tu proyecto de Firebase
    // Obtén una referencia a la colección de perros en Firestore
    const perros = await getDocs(query(collection(db, "perro")));

    perros.forEach((doc) => {
      this.dogs.push(doc.data() as Dog);
    });
  }
}
</script>

<style scoped lang="scss">
.competition-table {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
