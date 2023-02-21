<template>
  <div class="add-new-task-container">
    <h1>ADD A NEW TASK</h1>
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <input
      class="input-field-title"
      type="text"
      placeholder="Add a Task Title"
      v-model="name"
    />
    <textarea
      class="input-field-description"
      type="text"
      placeholder="Add a Task Description"
      v-model="description"
    ></textarea>
    <GeneralButton class="add-task-button" @click="addTask"
      >Add task</GeneralButton
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import ButtonTwo from "./ButtonTwo.vue";
import GeneralButton from "./GeneralButton.vue";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const emit = defineEmits(["addTitle"]);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = async () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    await taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
    emit("addTitle");
  }
};
</script>

<style scoped>
.add-new-task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3vw;
  width: 700px;
  min-height: 400px;
  border-radius: 30px;
  background-color: var(--colorWhite);
  box-shadow: 5px 5px 15px var(--colorBlack);
}

.input-field-title {
  font-family: "Poppins", sans-serif;
  width: 570px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 1%;
  padding-left: 25px;
  border: 1px solid var(--colorGray);
}

.input-field-description {
  width: 550px;
  font-family: "Poppins", sans-serif;
  min-height: 100px;
  border-radius: 5px;
  margin-bottom: 2%;
  padding: 25px;
  border: 1px solid var(--colorGray);
}

.add-task-button {
  width: 600px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .add-new-task-container {
    width: 360px;
    margin: 30px 30px;
  }
  .input-field-title {
    width: 300px;
  }
  .input-field-description {
    width: 277px;
  }
  .add-task-button {
    width: 320px;
  }
}
</style>
