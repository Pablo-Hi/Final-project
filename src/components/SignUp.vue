<template>
  <body class="sign-up-body">
    <div class="sign-up-container">
      <h1 class="header-title">Become a player!</h1>
      <form @submit.prevent="signUp" class="form-sign-in">
        <div class="insert-data">
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input
              type="email"
              class="email-input"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input
              class="email-input"
              type="password"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Confirm password</label>
            <input
              class="email-input"
              type="password"
              placeholder="**********"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <ButtonTwo class="btn-sign-up" type="submit">Sign Up</ButtonTwo>
        </div>
        <div class="go-back">
          <p>Have an account?</p>
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="button-two"
          />
        </div>
      </form>

      <div v-show="errorMsg">{{ errorMsg }}</div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import GeneralButton from "../components/GeneralButton.vue";
import ButtonTwo from "./ButtonTwo.vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style scoped>
.sign-up-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://cdn.vox-cdn.com/thumbor/E0EL7AhJOZx7EorqdS9-J3PnajA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24325828/usa_today_17435839.jpg");
  background-size: cover;
  background-position: center;
  padding: 50px;
  height: 100vh;
}
.sign-up-container {
  color: var(--colorBlack);
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 600px;
  height: 600px;
  background-color: var(--colorWhite);
  border: 1px solid var(--colorBlack);
  border-radius: 3px;
  box-shadow: 7px 7px 15px var(--colorBlack);
  background-image: url("https://media.istockphoto.com/id/1291938358/es/v%C3%ADdeo/humo-llenando-el-fondo-de-movimiento-de-la-pantalla-alfa-mate.jpg?s=640x640&k=20&c=E_aOY2Jobf6QYj1whzJcB4F7INB3HyqKztzSscjiaow=");
  background-size: cover;
  background-position: center;
}

.header-title {
  position: relative;
  margin-top: 1%;
}

.form-sign-in {
  display: flex;
  justify-content: space-between;
  margin-top: -5%;
  height: 70%;
  width: 35vw;
}
.btn-sign-up {
  margin-top: 2vw;
}
.input-field-label {
  margin: 1vh;
}
.form-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.go-back {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
}
@media (max-width: 768px) {
  .sign-up-body{
    justify-content: flex-start;
    padding: 0;
    
  }
  .form-sign-in {
    display: flex;
    flex-direction: column;
  }
  .sign-up-container {
    height: 650px;
    width: 300px;
    justify-content: flex-start;
    padding: 20px;
    margin-top: 40px;
  }
}
</style>
>
