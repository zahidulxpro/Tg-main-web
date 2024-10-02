<template>
  <div class="app-container">
    <router-view />
    <nav class="tab-bar">
      <router-link to="/point-mining" class="tab-item" :class="{ active: $route.path === '/point-mining' }">
        <span>🪙 Point Mining</span>
      </router-link>
      <router-link to="/task" class="tab-item" :class="{ active: $route.path === '/task' }">
        <span>📋 Task</span>
      </router-link>
      <router-link to="/invite-friend" class="tab-item" :class="{ active: $route.path === '/invite-friend' }">
        <span>👥 Invite Friends</span>
      </router-link>
      <router-link to="/total-airdrop-balance" class="tab-item" :class="{ active: $route.path === '/total-airdrop-balance' }">
        <span>💰 Total Balance</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
// Nothing is needed here right now, but if you need JavaScript for functionality, add it here.
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.tab-bar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #007bff;
  padding: 0.5rem 0;
}

.tab-item {
  text-align: center;
  color: #ffffff;
  flex-grow: 1;
  padding: 0.5rem;
  text-decoration: none;
}

.tab-item.active {
  background-color: #0056b3;
  border-radius: 8px;
}
</style>
