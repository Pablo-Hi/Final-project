<template>
  <nav>
    <div class="logo-nav">
      <img
        class="nav-img"
        src="https://i.bleacherreport.net/images/team_logos/328x328/alabama_crimson_tide_football.png?canvas=492,328"
        alt="alabama logo"
      />
    </div>
    <div class="menu-routes">
      <router-link to="/"> Home </router-link>
      <router-link to="/">Task Manager</router-link>
      <router-link to="/account">Your Account</router-link>
    </div>
    <div class="welcome-player">
      <p>Welcome, {{ username }}!</p>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const username = ref(null);
const userStore = useUserStore();
const avatar_url = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
}

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;
</script>

<style>
nav {
  /* display: flex;
  flex-direction: row; */
  color: var(--colorRed);
  background-color: var(--colorGray);
  width: 100%;
  /* align-items: center;
  justify-content: center; */
  margin-top: 2vw;
}

.nav-img {
  height: 50px;
  width: 70px;
}
.logo-nav {
  position: relative;
  display: inline-block;
  border: 3px solid red;
}
.menu-routes {
  position: relative;
  display: inline-block;
  border: 3px solid yellow;
}
.welcome-player {
  position: relative;
  display: inline-block;
  right: 2vw;
  border: 3px solid green;
}
</style>
