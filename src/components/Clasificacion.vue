<template>
  <div class="competition-table">
    <h2>Clasificación de la Competición de Agility de Perros</h2>
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre del Perro</th>
          <th>Liga</th>
          <th>Puntuación</th>
          <!-- Otros encabezados según tus necesidades -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dog, index) in dogs" :key="dog.id">
          <td>{{ index + 1 }}</td>
          <td>{{ dog.name }}</td>
          <td>{{ dog.league }}</td>
          <td>{{ dog.score }}</td>
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
  name: string;
  league: string;
  score: number;
  // Otros campos según tus necesidades
}

@Options({})
export default class CompetitionTable extends Vue {
  dogs: Dog[] = [
    { id: 1, name: "Max", league: "Liga A", score: 100 },
    { id: 2, name: "Buddy", league: "Liga B", score: 95 },
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
