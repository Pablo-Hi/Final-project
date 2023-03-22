<template>
  <nav>
    <router-link :class="'menu-item a-pic-box'" to="/"
      ><img
        class="nav-img"
        src="https://i.bleacherreport.net/images/team_logos/328x328/alabama_crimson_tide_football.png?canvas=492,328"
        alt="alabama logo"
    /></router-link>

    <div class="menu-routes">
      <router-link class="menu-item" to="/"> Home </router-link>
      <router-link class="menu-item" to="/mystery">Mystery</router-link>
      <router-link class="menu-item" to="/account">Your Account</router-link>
    </div>
    <router-link class="welcome-player" to="/account"
      >Welcome, {{ username }}!</router-link
    >
    <div class="log-out-btn-container">
      <button @click="signOut" class="log-out-button">Log out</button>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { onMounted, ref, toRefs } from "vue";

const username = ref(null);
const userStore = useUserStore();
const redirect = useRouter();
const avatar_url = ref(null);

onMounted(() => {
  getProfile();
});

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    useUserStore().signOut();
    // then redirect user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};

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
.a-pic-box {
  width: 50px;
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
  width: 25%;
  background-color: var(--colorRed);
  color: var(--colorWhite);
  text-decoration: none;
  font-size: large;
  font-weight: 500;
  margin-right: 25px;
}
.welcome-player:hover {
  color: var(--colorRed);
  background-color: var(--colorWhite);
  cursor: pointer;
}

.log-out-btn-container {
  width: 8%;
  height: 100%;
}

.log-out-button {
  color: var(--colorWhite);
  background-color: var(--colorRed);
  font-family: "Poppins", sans-serif;
  font-size: large;
  border: 0;
  font-weight: 500;
  width: 100%;
  height: 100%;
}
.log-out-button:hover {
  color: var(--colorRed);
  background-color: var(--colorWhite);
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-routes {
    display: none;
  }
  .welcome-player {
    width: 50%;
    font-size: medium;
    margin: 0;
  }
  .log-out-btn-container {
    width: 25%;
  }
  .log-out-button {
    font-size: medium;
  }
}
</style>
