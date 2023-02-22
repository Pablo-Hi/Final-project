<template>
  <div class="task-item-container" :class="{ container: isTachado }">
    <div v-if="showInput" class="edit-data">
      <div class="new-data-form">
        <p>Insert new title</p>
        <input type="text" v-model="newTitle" class="title-edit" />
        <p>Insert new description</p>
        <textarea
          type="text"
          v-model="newDescription"
          class="textarea-edit"
        ></textarea>
      </div>

      <div class="btn-edit-container">
        <button :class="'task-item-btn btn-update'" @click="sendData"></button>
        <button
          :class="'task-item-btn btn-cancel'"
          @click="inputToggle"
        ></button>
      </div>
    </div>
    <div v-else>
      <h3 @click="inputToggle">{{ task.title }}</h3>
      <p @click="inputToggle">{{ task.description }}</p>
    </div>
    <div class="btn-container">
      <button
        :class="'task-item-btn btn-delete'"
        @click="alertToggle"
        v-if="!showInput"
      ></button>
      <button
        @click="switchToComplete"
        :class="{
          'task-item-btn': true,
          'btn-complete': true,
          markAsCompletedBtn: isTachado,
        }"
        v-if="!showInput"
      ></button>
      <button
        :class="'task-item-btn btn-edit'"
        @click="inputToggle"
        v-if="!showInput"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
import swal from "sweetalert";

const taskStore = useTaskStore();
const emit = defineEmits(["updateTask"]);

const props = defineProps({
  task: Object,
});
const isTachado = ref(props.task.is_complete);

const showInput = ref(false);
const newTitle = ref("");
const newDescription = ref("");

function inputToggle() {
  showInput.value = !showInput.value;
}

function switchToComplete() {
  isTachado.value = !isTachado.value;
  taskStore.completeTask(isTachado.value, props.task.id);
}

// Función para borrar la tarea a través de la store. //

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  emit("updateTask");
};

const sendData = async () => {
  if (newTitle.value.length < 4 || newDescription.value.length < 4) {
    //Lanzar un error
  } else {
    taskStore.editTask(newTitle.value, newDescription.value, props.task.id);
    emit("updateTask");
  }
  inputToggle();
};

const showAlert = ref(false);

function alertToggle() {
  showAlert.value = !showAlert.value;
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task!",
    icon: "warning",
    buttons: ["Cancel", "Delete"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteTask();
      swal("Poof! Your task has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your task is safe!");
    }
  });
}
</script>

<style scoped>
.container {
  color: gray;
  text-decoration: dashed;
}

.markAsCompletedBtn {
  box-shadow: 0px 0px 15px var(--colorBlack);
}

.task-item-container {
  background-color: var(--colorWhite);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  margin: 2%;
  padding: 2%;
  height: 300px;
  width: 255px;
  box-shadow: 5px 5px 15px var(--colorBlack);
}
.edit-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 300px;
  padding: 0 15px;
}

.new-data-form {
  display: flex;
  flex-direction: column;
}
.title-edit {
  font-family: "Poppins", sans-serif;
  width: 220px;
  padding: 0 15px;
}
.textarea-edit {
  font-family: "Poppins", sans-serif;
  width: 220px;
  height: 70px;
  padding: 0 15px;
}
.btn-edit-container {
  margin-bottom: 15px;
}
.task-item-btn {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 0px solid;
  margin: 5px;
}
.task-item-btn:hover {
  cursor: pointer;
  box-shadow: 0 0.5em 0.5em -0.4em var(--colorBlack);
  transform: translateY(-0.25em);
}
.btn-delete {
  background-image: url("../images/delete.png");
  background-size: cover;
  background-position: center;
}

.btn-complete {
  background-image: url("../images/complete.png");
  background-size: cover;
  background-position: center;
}
.btn-edit {
  background-image: url("../images/edit.png");
  background-size: cover;
  background-position: center;
}
.btn-update {
  background-image: url("../images/enviar.png");
  background-size: cover;
  background-position: center;
}
.btn-cancel {
  background-image: url("../images/cancel.png");
  background-size: cover;
  background-position: center;
}

@media (max-width: 768px) {
  .task-item-container {
    width: 300px;
    margin-bottom: 40px;

  }
}
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
