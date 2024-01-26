<template>
  <div class="competition-view">
    <h2>Visualizar Competición</h2>
    <div class="select-test">
      <label for="test-select">Selecciona la Prueba:</label>
      <select v-model="selectedTest" @change="fetchResults">
        <option value="">Selecciona una prueba...</option>
        <option v-for="test in tests" :key="test.id" :value="test.id">
          {{ test.name }}
        </option>
        <option value="create">Crear Prueba Nueva</option>
      </select>
    </div>

    <div v-if="selectedTest && selectedTest !== 'create'">
      <h3>Clasificación de la Prueba: {{ selectedTestName }}</h3>
      <!-- Tabla de resultados -->
    </div>

    <div v-if="selectedTest === 'create'">
      <h3>Crear Nueva Prueba</h3>
      <form @submit.prevent="createTest">
        <label for="test-date">Fecha:</label>
        <input type="date" id="test-date" v-model="newTest.date" />

        <label for="test-type">Tipo de Prueba:</label>
        <select id="test-type" v-model="newTest.type">
          <option value="agility">Agility</option>
          <option value="jumping">Jumping</option>
        </select>

        <label for="test-dogs">Perros:</label>
        <select id="test-dogs" v-model="newTest.dogs" multiple>
          <option v-for="dog in dogs" :key="dog.id" :value="dog.id">
            {{ dog.name }}
          </option>
        </select>

        <button type="submit">Crear Prueba</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

interface Test {
  id: number;
  name: string;
}

interface Dog {
  id: number;
  name: string;
}

@Options({})
export default class CompetitionView extends Vue {
  selectedTest: number | "create" | null = null;
  selectedTestName = "";
  tests: Test[] = []; // Obtener estas pruebas de alguna fuente de datos
  dogs: Dog[] = []; // Obtener los perros de alguna fuente de datos
  newTest = {
    date: "",
    type: "agility",
    dogs: [] as number[],
  };

  fetchResults() {
    // Lógica para obtener los resultados de la prueba seleccionada
  }

  createTest() {
    // Lógica para crear una nueva prueba
  }
}
</script>

<style scoped lang="scss">
.competition-view {
  max-width: 800px;
  margin: 0 auto;
}

.select-test {
  margin-top: 20px;
}

form {
  margin-top: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}
</style>
