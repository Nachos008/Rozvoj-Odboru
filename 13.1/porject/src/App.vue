<script setup>
import { ref } from 'vue';

const info = ref(null);
async function sendRequest(){
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(url);
  info.value = await response.json();
}

</script>

<template>
  <div>
    <button @click="sendRequest()">Send Request</button>
    <br/>
    <p v-for="i in info">
      {{ i.id }} {{ i.title }} {{ i.completed }}
    </p>
  </div>
</template>

<style scoped>
</style>
