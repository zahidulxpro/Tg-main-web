<template>
  <div class="content">
    <h2>👥 Invite Friends</h2>
    <p>Invite your friends and earn 10 points instantly, plus 10% of their claim!</p>
    <div class="invite-section">
      <input type="text" v-model="inviteLink" readonly class="invite-input" />
      <button @click="copyInviteLink" class="button-secondary">Copy Link</button>
    </div>
    <button @click="shareInviteLink" class="button-primary">Share via Telegram</button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const botUsername = 'your_bot_username';
const inviteLink = ref('');
const message = ref('');

// Function to generate a unique invite link for the user
const generateInviteLink = async () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    const telegramId = tg.initDataUnsafe?.user?.id || Math.random().toString(36).substr(2, 9);
    const username = tg.initDataUnsafe?.user?.username || 'unknown';

    // Get or create user in the backend
    await axios.post('/api/users/get-or-create', { telegramId, username });

    inviteLink.value = `https://t.me/${botUsername}?start=${telegramId}`;
  } else {
    inviteLink.value = `https://t.me/${botUsername}?start=${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Function to copy the invite link to the clipboard
const copyInviteLink = () => {
  navigator.clipboard.writeText(inviteLink.value).then(() => {
    message.value = 'Invite link copied to clipboard!';
    setTimeout(() => {
      message.value = '';
    }, 3000);
  }).catch(() => {
    message.value = 'Failed to copy the link.';
  });
};

// Function to share the invite link via Telegram
const shareInviteLink = () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.openUrl(inviteLink.value);
  } else {
    window.open(inviteLink.value, '_blank');
  }
};

// Generate the invite link when the component is mounted
onMounted(() => {
  generateInviteLink();
});
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

.invite-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.invite-input {
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #f8f9fa;
}

.button-secondary,
.button-primary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.button-secondary {
  background-color: #007bff;
}

.button-secondary:hover {
  background-color: #0056b3;
}

.button-primary {
  background-color: #28a745;
}

.button-primary:hover {
  background-color: #218838;
}

.message {
  margin-top: 1rem;
  color: #28a745;
}
</style>
