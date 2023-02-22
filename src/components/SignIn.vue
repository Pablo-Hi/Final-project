<!-- COMPONENTE BOILERPLATE -->

<template>
  <body class="sign-in-body">
    <div class="sing-in-container">
      <img
        class="alabama-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alabama_Crimson_Tide_logo.svg/2048px-Alabama_Crimson_Tide_logo.svg.png"
        alt="alabama logo"
      />

      <h1 class="header-title">Welcome Player!</h1>
      <h3 class="header-subtitle">Start Organizing your tasks todays!</h3>
      <p>Sing in</p>
      <form class="sign-in-form" @submit.prevent="signIn">
        <input
          class="email-input"
          type="email"
          placeholder="example@gmail.com"
          v-model="email"
        />
        <input
          class="email-input"
          type="password"
          placeholder="**********"
          v-model="password"
        />
        <GeneralButton class="btn-sign-in" type="submit">Sign In</GeneralButton>
      </form>

      <p class="sign-up-container">
        Become a Player!
        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          :class="'button-two sing-up-btn'"
        />
      </p>
    </div>
  </body>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import GeneralButton from "./GeneralButton.vue";
import ButtonTwo from "./ButtonTwo.vue";

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
      alert ("An error has occurred, please try to register. If you have already registered, go to your email and confirm your email address.")
      console.log(error);
      throw error;
      
    }
  }
};
</script>

<style>
.sign-in-body {
  display: flex;
  justify-content: center;
  background-image: url("https://cdn.vox-cdn.com/thumbor/E0EL7AhJOZx7EorqdS9-J3PnajA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24325828/usa_today_17435839.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
}
.sing-in-container {
  color: var(--colorBlack);
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 30vw;
  margin: 2%;
  padding: 5%;
  background-color: var(--colorWhite);
  border: 2px solid var(--colorBlack);
  border-radius: 3px;
  box-shadow: 7px 7px 15px var(--colorBlack);
  background-image: url("https://media.istockphoto.com/id/1291938358/es/v%C3%ADdeo/humo-llenando-el-fondo-de-movimiento-de-la-pantalla-alfa-mate.jpg?s=640x640&k=20&c=E_aOY2Jobf6QYj1whzJcB4F7INB3HyqKztzSscjiaow=");
  background-size: cover;
  background-position: center;
}
.alabama-logo {
  width: 200px;
}

.sign-in-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.email-input {
  height: 3vw;
  width: 17vw;
  border-radius: 3px;
  box-shadow: 7px 7px 15px var(--colorBlack);
  margin-bottom: 6px;
}
.btn-sign-in {
  margin-top: 1vw;
}

.sign-up-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 15vw;
  width: 17vw;
}

@media (max-width: 768px) {
  .sign-in-body{
    height: 100%;
  }
  .sing-in-container {
    width: 60%;
    height: 750px;
    margin: 40px 0;
  }

  .alabama-logo {
    width: 100px;
  }
  .sign-in-form {
    width: 100%;
    height: 100%;
    align-items: center;
  }
  .email-input {
    width: 100%;
    height: 50px;
  }
  .btn-sign-in{
    width: 100%;

  }
  .sign-up-container {
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  .sing-up-btn{
    width: 80%;
  }
 
}
</style>
