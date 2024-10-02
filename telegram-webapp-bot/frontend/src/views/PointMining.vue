<template>
  <div class="content">
    <h2>🪙 Point Mining</h2>
    <p>Claim your points by submitting a special code every 8 hours!</p>
    <button :disabled="!canClaim" @click="claimPoints" class="button-primary">
      {{ canClaim ? 'Claim 40 Points' : `Claim available in ${remainingTime}` }}
    </button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const canClaim = ref(true);
const message = ref('');
const claimCooldown = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
let nextClaimTime = localStorage.getItem('nextClaimTime');

const updateTime = () => {
  if (nextClaimTime && new Date().getTime() < nextClaimTime) {
    canClaim.value = false;
  } else {
    canClaim.value = true;
  }
};

const remainingTime = computed(() => {
  if (!nextClaimTime) return '';
  const timeLeft = nextClaimTime - new Date().getTime();
  if (timeLeft <= 0) return '';
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
});

const claimPoints = () => {
  if (canClaim.value) {
    message.value = 'You have successfully claimed 40 points!';
    nextClaimTime = new Date().getTime() + claimCooldown;
    localStorage.setItem('nextClaimTime', nextClaimTime);
    canClaim.value = false;
    setTimeout(() => {
      message.value = '';
    }, 3000);
  }
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
.content {
  padding: 2rem;
  text-align: center;
}

.button-primary {
  background-color: #28a745;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  color: #28a745;
}
</style>
