<template>
  <Nav />
  <body class="edit-profile-body">
    <div class="edit-profile-box">
      <p>Insert new Name</p>
      <input type="text" v-model="newUserName" placeholder="Insert Name..." />
      <p>Insert new Number</p>
      <input
        type="number"
        v-model="newUserNumber"
        placeholder="Insert Number..."
      />
      <p>Insert new Position</p>
      <select v-model="newUserPosition" name="position" id="">
        <option value="Tight End">Tight End</option>
        <option value="Running Back">Line Backer</option>
        <option value="Quarterback">Quarterback</option>
        <option value="Wide Receiver">Wide Receiver</option>
      </select>
      <p>Insert new Height (")</p>
      <input
        type="text"
        v-model="newUserHeight"
        placeholder="Insert Height..."
      />
      <p>Insert new Weight (lbs)</p>
      <input
        type="number"
        v-model="newUserWeight"
        placeholder="Insert Weight..."
      />
    </div>
    <GeneralButton @click="updateProfile">Update profile</GeneralButton>
  </body>
</template>
<script setup>
import Nav from "../components/Nav.vue";
import { ref, reactive, onMounted } from "vue";
import GeneralButton from "../components/GeneralButton.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const newUserName = ref("");
const newUserNumber = ref("");
const newUserPosition = ref("");
const newUserHeight = ref("");
const newUserWeight = ref(null);
const userStore = useUserStore();
const redirect = useRouter();

async function getProfile() {
  await userStore.fetchUser();
  newUserName.value = userStore.profile.username;
  newUserNumber.value = userStore.profile.usernumber;
  newUserPosition.value = userStore.profile.userposition;
  newUserHeight.value = userStore.profile.userheight;
  newUserWeight.value = userStore.profile.userweight;
  //   avatar_url.value = userStore.profile.avatar_url;
}

onMounted(() => {
  getProfile();
});

const updateProfile = async () => {
  await userStore.editProfile(
    newUserName.value,
    newUserNumber.value,
    newUserPosition.value,
    newUserHeight.value,
    newUserWeight.value
  );
  redirect.push({ path: "/account" });
};
</script>

<style scoped>
.edit-profile-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.edit-profile-box {
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: 800;
  margin: 3%;
  padding: 1%;
  width: 500px;
  height: 450px;
  border: 2px solid black;
  background-color: var(--colorWhite);

  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alabama_Athletics_logo.svg/800px-Alabama_Athletics_logo.svg.png");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 5px 5px 15px var(--colorBlack);
}
</style>
