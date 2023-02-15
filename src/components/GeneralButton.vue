<template>
  <button class="principal-button"><slot /></button>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap");

.principal-button {
  font-size: larger;
  text-decoration: none;
  font-style: normal;
  font-family: "Roboto Slab", serif;
  background: var(--colorRed);
  color: var(--colorWhite);
  border: 2px solid var(--colorBlack);
  padding: 16px 20px;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: inline-block;
  box-shadow: 7px 7px 15px var(--colorBlack);
}
.principal-button:hover {
  color: var(--colorRed);
  border: 2px solid var(--colorRed);
  cursor: pointer;
}

.principal-button::after {
  content: "";
  background: var(--colorWhite);
  position: absolute;
  z-index: -1;
  padding: 16px 20px;
  display: block;
  top: 0;
  bottom: 0;
  left: -100%;
  right: 100%;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
}
.principal-button:hover::after {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
}
</style>
