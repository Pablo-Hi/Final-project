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
      <img
        class="profile-pic"
        :src="
          avatar_url
            ? avatar_url
            : 'https://www.al.com/resizer/rR7cTV9NONBRBNAurVxfCZYYKK4=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/AYSONSNQ2FGRHKPPZD3UGG3IXM.jpg'
        "
        alt="Profile picture"
      />
    </div>
  </body>

  <GeneralButton @click="goToEditProfile">Edit profile</GeneralButton>
  <ButtonTwo @click="signOut" class="button-two">Log out</ButtonTwo>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import GeneralButton from "../components/GeneralButton.vue";
import { useRouter } from "vue-router";
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
  avatar_url.value = userStore.profile.avatar_url;
}

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
// const redirect = useRouter();

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    useUserStore().signOut();
    // then redirect user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};
</script>

<style>
/* img {
  width: 200px;
  border-radius: 50%;
} */
.account-body {
  display: flex;
  justify-content: center;
}
.total-profile-box {
  display: flex;
  margin-top: 3%;
  width: 60%;
  height: 40%;
  border: 2px solid black;
  border-radius: 15px;
}
.profile-pic {
  width: 200px;
  height: 200px;
}
</style>
