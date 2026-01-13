<script setup>
  import { ref } from 'vue'

  const username = ref('');

  function Hello(){
    alert(`Hello ${username.value}!`);
  }

</script>

<template>
  <h1>
    Hello {{ username }}
  </h1>
  <input v-model="username" type="text" placeholder="Enter your name" />
  <button @click="Hello">Say Hello</button>
</template>


