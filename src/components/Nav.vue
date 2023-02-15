<template>
  <nav>
    <img
      class="nav-img"
      src="https://i.bleacherreport.net/images/team_logos/328x328/alabama_crimson_tide_football.png?canvas=492,328"
      alt="alabama logo"
    />
    <div class="menu-routes">
      <router-link class="menu-item" to="/"> Home </router-link>
      <router-link class="menu-item" to="/">Task Manager</router-link>
      <router-link class="menu-item" to="/account">Your Account</router-link>
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

<style scoped>
nav {
  display: flex;
  color: var(--colorRed);
  background-color: var(--colorGray);
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 2vw;
  background-image: url("https://media.istockphoto.com/id/1291938358/es/v%C3%ADdeo/humo-llenando-el-fondo-de-movimiento-de-la-pantalla-alfa-mate.jpg?s=640x640&k=20&c=E_aOY2Jobf6QYj1whzJcB4F7INB3HyqKztzSscjiaow=");
  background-size: cover;
  background-position: center;
  box-shadow: 5px 5px 15px var(--colorBlack);

  /* border: 3px solid blue; */
}

.nav-img {
  height: 100%;
  margin: 5px 0;
  /* border: 3px solid red; */
}

.menu-routes {
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 50%;
  /* border: 3px solid yellow; */
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colorRed);
  height: 100%;
  width: 25%;
  line-height: 100%;
  text-decoration: none;
  font-size: large;
  font-weight: 500;
}

.menu-item:hover {
  background-color: var(--colorRed);
  color: var(--colorWhite);
}

.welcome-player {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
  background-color: var(--colorRed);
  color: var(--colorWhite);
  font-size: larger;
  /* border: 3px solid green; */
}
</style>
