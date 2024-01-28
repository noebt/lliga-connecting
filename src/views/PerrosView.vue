<template>
  <div class="dog-table">
    <h2>Gossos</h2>
    <button v-if="!hayFilaVacia" @click="agregarFila" class="add-button">
      <i class="fas fa-check"></i> Añadir
    </button>
    <button v-else @click="cancelarAgregarFila" class="cancel-button">
      Cancelar
    </button>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Dueño</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dog, index) in dogs" :key="dog.id">
          <td
            @click="modoEdicion ? null : editarPerro(dog)"
            :contenteditable="modoEdicion"
            @input="actualizarNombre(index, $event)"
            @blur="actualizarPerro(dog)"
            @keyup.enter="actualizarPerro(dog)"
          >
            {{ dog.nombre }}
          </td>
          <td
            @click="modoEdicion ? null : editarPerro(dog)"
            :contenteditable="modoEdicion"
            @input="actualizarDueño(index, $event)"
            @blur="actualizarPerro(dog)"
            @keyup.enter="actualizarPerro(dog)"
          >
            {{ dog.dueño }}
          </td>
          <td>
            <button
              v-if="!nuevoPerro || dog !== perroEditado"
              @click="confirmarEliminar(dog)"
              class="delete-button"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            <button v-else @click="crearPerro(dog)" class="add-button">
              <i class="fas fa-check"></i> Afegir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../services/firebase";

interface Dog {
  id: string;
  nombre: string;
  dueño: string;
}

@Options({})
export default class PerrosTable extends Vue {
  dogs: Dog[] = [];
  modoEdicion = false;
  nuevoPerro = false;
  perroEditado: Dog | null = null;
  mensaje: string | null = null;

  get hayFilaVacia() {
    return (
      this.dogs.length > 0 &&
      (this.dogs[0].nombre === "" || this.dogs[0].dueño === "")
    );
  }

  async mounted() {
    await this.obtenerPerros();
  }

  async obtenerPerros() {
    const perros = await getDocs(query(collection(db, "perro")));
    perros.forEach((doc) => {
      this.dogs.push({
        nombre: doc.data().nombre,
        dueño: doc.data().dueño,
        id: doc.id,
      } as Dog);
    });
  }

  async agregarFila() {
    if (!this.hayFilaVacia) {
      this.dogs.unshift({ id: "", nombre: "", dueño: "" });
      this.nuevoPerro = true;
      this.perroEditado = this.dogs[0];
    }
  }

  async cancelarAgregarFila() {
    if (this.hayFilaVacia) {
      this.dogs.shift(); // Eliminar la fila vacía
      this.nuevoPerro = false;
      this.perroEditado = null;
    }
  }

  async editarPerro(perro: Dog) {
    this.modoEdicion = true;
    this.perroEditado = perro;
  }

  async crearPerro(perro: Dog) {
    try {
      await addDoc(collection(db, "perro"), perro);
      this.mensaje = "Perro agregado correctamente.";
      setTimeout(() => {
        this.mensaje = null;
      }, 3000);
      this.nuevoPerro = false;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async actualizarPerro(perro: Dog) {
    try {
      await updateDoc(doc(db, "perro", perro.id.toString()), {
        nombre: perro.nombre,
        dueño: perro.dueño,
      });
      this.modoEdicion = false;
      this.perroEditado = null;
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async confirmarEliminar(perro: Dog) {
    if (confirm("¿Estás seguro de que quieres eliminar este perro?")) {
      await this.eliminarPerro(perro.id);
    }
  }

  async eliminarPerro(id: string) {
    try {
      await deleteDoc(doc(db, "perro", id.toString()));
      this.dogs = this.dogs.filter((dog) => dog.id !== id);
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }

  actualizarNombre(index: number, event: Event) {
    this.dogs[index].nombre = (event.target as HTMLElement).innerText;
  }

  actualizarDueño(index: number, event: Event) {
    this.dogs[index].dueño = (event.target as HTMLElement).innerText;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.perroEditado = null;
  }
}
</script>

<style scoped lang="scss">
.dog-table {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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

.add-button,
.cancel-button,
.delete-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition-duration: 0.4s;
}

.add-button:hover,
.cancel-button:hover,
.delete-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
}

.cancel-button:hover {
  background-color: #da190b;
}

.fa-trash-alt,
.fa-check {
  margin-right: 5px;
}

.mensaje {
  background-color: #55aa55;
  color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
}
</style>
