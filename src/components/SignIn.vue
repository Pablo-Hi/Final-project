<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <h3 class="header-title">Welcome to Wu Tasks</h3>
    <p class="header-subtitle">Start Organizing your tasks todays!</p>
    <p>Sing in</p>
    <form action="singIn">
      <input type="email" placeholder="example@gmail.com" v-model="email" />
      <input type="pasword" placeholder="**********" v-model="pasword" />
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
import { ref, reactive }



// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  console.log("Hola pepsicola");
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

<style></style>
