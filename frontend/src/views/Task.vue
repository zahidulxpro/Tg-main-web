<template>
  <div class="content">
    <h2>📋 Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <p>{{ task.description }}</p>
        <button @click="completeTask(task.id)" class="button-task">Join</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { id: 1, description: 'Join our Telegram Group' },
  { id: 2, description: 'Follow us on Twitter' },
  { id: 3, description: 'Follow us on Facebook' },
  { id: 4, description: 'Subscribe to our YouTube Channel' },
]);

const completeTask = (taskId) => {
  window.open('https://socialplatform.com/link', '_blank');
};
</script>

<style scoped>
.content {
  padding: 2rem;
}

.task-item {
  list-style: none;
  margin-bottom: 1.5rem;
}

.button-task {
  background-color: #ffc107;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-task:hover {
  background-color: #e0a800;
}
</style>
