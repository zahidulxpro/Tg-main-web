<template>
  <div class="content">
    <h2>💰 Total Airdrop Balance</h2>
    <p>Your current balance is: <span class="balance">{{ totalBalance }}</span> points.</p>
    <p>Stay updated for the next airdrop and keep accumulating rewards!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Example total balance value
const totalBalance = ref(120);
</script>

<style scoped>
.content {
  padding: 2rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.balance {
  font-weight: bold;
  font-size: 1.5rem;
  color: #007bff;
}
</style>
