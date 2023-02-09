<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alabama_Crimson_Tide_logo.svg/2048px-Alabama_Crimson_Tide_logo.svg.png"
      alt="alabama logo"
    />
    <h3 class="header-title">Welcome Player!</h3>
    <p class="header-subtitle">Start Organizing your tasks todays!</p>
    <p>Sing in</p>
    <form @submit.prevent="signIn">
      <input type="email" placeholder="example@gmail.com" v-model="email" />
      <input type="password" placeholder="**********" v-model="password" />
      <button class="button" type="submit">Sign In</button>
    </form>

    <p>
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  if (email.value) {
    try {
      await useUserStore().signIn(email.value, password.value);
      redirect.push({ path: "/" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
</script>

<style>
.contaienr {
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
