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
        <optgroup label="Offense">
          <option value="Quarterback">Quarterback</option>
          <option value="Runningback">Running Back</option>
          <option value="Fullback">Fullback</option>
          <option value="Left Tackle">Left Tackle</option>
          <option value="Left Guard">Left Guard</option>
          <option value="Center">Center</option>
          <option value="Right Guard">Right Guard</option>
          <option value="Right Tackle">Right Tackle</option>
          <option value="Tight End">Tight End</option>
          <option value="Wide Receiver">Wide Receiver</option>
          <option value="Wide Receiver">Wide Receiver</option>
        </optgroup>

        <optgroup label="Defense">
          <option value="Defensive Tackle">Defensive Tackle</option>
          <option value="Defensive End">Defensive End</option>
          <option value="Cornerback">Cornerback</option>
          <option value="Outside Linebacker">Outside Linebacker</option>
          <option value="Middle Linebacker">Middle Linebacker</option>
          <option value="Strong Safety">Strong Safety</option>
          <option value="Free Safety">Free Safety</option>
        </optgroup>
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
      <p>Insert new Profile Pic</p>
      <input @change="newProfilePic" type="file" v-on:input="uploadImage" />
    </div>
    <GeneralButton @click="updateProfile">Update profile</GeneralButton>
  </body>
  <Footer/>
</template>
<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue"
import { ref, reactive, onMounted } from "vue";
import GeneralButton from "../components/GeneralButton.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";

const newUserName = ref("");
const newUserNumber = ref("");
const newUserPosition = ref("");
const newUserHeight = ref("");
const newUserWeight = ref(0);
const newProfilePic = ref(null);
const avatar_url = ref('https://khznphzalbcydmmwpanx.supabase.co/storage/v1/object/public/avatars/');
const userStore = useUserStore();
const redirect = useRouter();
const loading = ref(false);
const src = ref('')


const uploadImage = async (element) => {
  const file = element.target.files[0]
  console.log(file)
  try {
      if(!file || file.length === 0) {
      throw new Error("You must select a valid picture")
      };

  const fileExt = file.name.split(".").pop()
  console.log(fileExt);

  const filePath = `${Math.random()}.${fileExt}`

  let {error:uploadError} = await supabase.storage.from('avatars').upload(filePath, file, {upsert:false})

if (uploadError) throw uploadError
avatar_url.value = ('https://khznphzalbcydmmwpanx.supabase.co/storage/v1/object/public/avatars/' + filePath)


await downloadImage(filePath) 
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    } 
}

const downloadImage = async (imgURL) => {
  try {
console.log("Filepath", avatar_url);
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(imgURL);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const editImageLocal = async(value) => {
    await userStore.editImage(value)
  
  }



async function getProfile() {
  await userStore.fetchUser();
  newUserName.value = userStore.profile.username;
  newUserNumber.value = userStore.profile.usernumber;
  newUserPosition.value = userStore.profile.userposition;
  newUserHeight.value = userStore.profile.userheight;
  newUserWeight.value = userStore.profile.userweight;
  newProfilePic.value = userStore.profile.avatar_url;
}

onMounted(() => {
  getProfile();
});

const updateProfile = async () => {
  // if (newProfilePic) {
  //   avatar_url.value = newProfilePic.value;
  // }
  await userStore.editProfile(
    newUserName.value,
    newUserNumber.value,
    newUserPosition.value,
    newUserHeight.value,
    newUserWeight.value,
    avatar_url.value
  );
  redirect.push({ path: "/account" });
};



</script>

<style scoped>
.edit-profile-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.edit-profile-box {
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: 800;
  margin: 4%;
  padding: 1%;
  width: 500px;
  height: 550px;
  background-color: var(--colorWhite);
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alabama_Athletics_logo.svg/800px-Alabama_Athletics_logo.svg.png");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 5px 5px 15px var(--colorBlack);
}

@media (max-width: 768px) {
  .edit-profile-box {
    width: 320px;
    height: 530px;
    margin: 30px 0;
  }
}
</style>
