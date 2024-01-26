<template>
  <div class="competition-table">
    <h2>Clasificación de la Competición de Agility de Perros</h2>
    <table>
      <thead>
        <tr>
          <th>Posició</th>
          <th>Gos</th>
          <th>Liga</th>
          <th>Puntuación</th>
          <!-- Otros encabezados según tus necesidades -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dog, index) in dogs" :key="dog.id">
          <td>{{ index + 1 }}</td>
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

interface Dog {
  id: number;
  nombre: string;
  dueño: string;
  // Otros campos según tus necesidades
}

@Options({})
export default class CompetitionTable extends Vue {
  dogs: Dog[] = [
    { id: 1, nombre: "Max", dueño: "Liga A" },
    { id: 2, nombre: "Buddy", dueño: "Liga B" },
    // Agrega más datos según sea necesario
  ];
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
