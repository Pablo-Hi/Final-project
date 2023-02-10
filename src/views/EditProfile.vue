<template>
  <Nav />
  <div>
    <p>Insert new Name</p>
    <input type="text" v-model="newUserName" placeholder="Insert Name..." />
  </div>
  <div>
    <p>Insert new Number</p>
    <input type="text" v-model="newUserNumber" placeholder="Insert Number..." />
  </div>
  <div>
    <p>Insert new Position</p>
    <input
      type="text"
      v-model="newUserPosition"
      placeholder="Insert Position..."
    />
  </div>
  <div>
    <p>Insert new Height</p>
    <input type="text" v-model="newUserHeight" placeholder="Insert Height..." />
  </div>
  <div>
    <p>Insert new Weight</p>
    <input type="text" v-model="newUserWeight" placeholder="Insert Weight..." />
  </div>
  <GeneralButton @click="updateProfile">Update profile</GeneralButton>
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
const newUserWeight = ref("");
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

<style scoped></style>
