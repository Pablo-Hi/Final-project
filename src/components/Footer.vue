<template>
  <footer>
    <div>
      <h2>Thank you for using my App!</h2>
    </div>
    <div>
      <h4>Find me at:</h4>
    </div>

    <div class="find-me-logos-container">
      <a href="https://www.linkedin.com/in/pablo-pe%C3%B1a-mulero-369a41210/"
        ><img class="find-me-logos" src="../images/linkdin.png" alt="icono linkedIn"
      /></a>
      <a href="https://open.spotify.com/user/1162969068?si=f72d7124b2dc4e73"
        ><img class="find-me-logos" src="../images/spotify.png" alt="spotify logo"
      /></a>
      <a href="https://github.com/Pablo-Hi"
        ><img class="find-me-logos" src="../images/github.png" alt="github logo"
      /></a>
    </div>
    <div>
      <p>By Pablo Peña 😊</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
  footer{
    background-color: var(--colorRed);
    color: var(--colorWhite);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* height: 28vh; */
  }
 
.find-me-logos{
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border: 2px solid var(--colorGray);
  border-radius: 50%;
}

</style>
