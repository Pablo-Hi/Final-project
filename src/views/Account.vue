<template>
  <Nav />
  <body class="account-body">
    <div class="total-profile-box">
      <div class="data-box">
        <h3>Name: {{ username }}</h3>
        <h3>Number: {{ usernumber }}</h3>
        <h3>Position: {{ userposition }}</h3>
        <h3>Height: {{ userheight }}"</h3>
        <h3>Weight: {{ userweight }} lbs</h3>
      </div>
      <div class="profile-pic-box">
        <img
          class="profile-pic"
          src="https://s.yimg.com/ny/api/res/1.2/JejRllNp6vA008DSG_9mIg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk1MQ--/https://media.zenfs.com/en/the-tuscaloosa-news/c91cbf31a44372ec2def2c29bbf62a1d"
          alt="alabama player"
        />
      </div>
    </div>
    <GeneralButton @click="goToEditProfile">Edit profile</GeneralButton>
  </body>
  <Footer/>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue"
import GeneralButton from "../components/GeneralButton.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";

// import PersonalRouter from "../components/PersonalRouter.vue";

const userStore = useUserStore();
const redirect = useRouter();

const goToEditProfile = () => {
  redirect.push({ path: "/edit" });
};

// const route = "./EditProfile.vue";
// const buttonText = "Edit";

const loading = ref(false);
const website = ref(null);
const avatar_url = ref(null);
const username = ref(null);
const usernumber = ref(null);
const userposition = ref(null);
const userheight = ref(null);
const userweight = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  usernumber.value = userStore.profile.usernumber;
  userposition.value = userStore.profile.userposition;
  userheight.value = userStore.profile.userheight;
  userweight.value = userStore.profile.userweight;
  avatar_url.value = userStore.profile.image;
}

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
// const redirect = useRouter();
</script>

<style>
.account-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.total-profile-box {
  display: flex;
  margin: 5%;
  padding: 1%;
  width: 500px;
  height: 300px;
  border: 2px solid black;
  background-color: var(--colorWhite);
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alabama_Athletics_logo.svg/800px-Alabama_Athletics_logo.svg.png");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 5px 5px 15px var(--colorBlack);
}
.data-box {
  color: var(--colorBlack);
  font-size: large;
  height: 100%;
  width: 100%;
}
.profile-pic-box {
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
}
.profile-pic {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: top;
}
@media (max-width: 768px) {
  .total-profile-box {
    display: flex;
    flex-direction: column-reverse;
    width: 350px;
    height: 600px;
  }
  .profile-pic-box {
    border: 1px solid black;
    border-radius: 15px;
    width: 100%;
    height: 300px;
  }
  .profile-pic {
    border-radius: 15px;
  }
}
</style>
