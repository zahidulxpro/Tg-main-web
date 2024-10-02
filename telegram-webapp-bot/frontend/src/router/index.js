import { createRouter, createWebHistory } from 'vue-router';
import PointMining from '../views/PointMining.vue';
import Task from '../views/Task.vue';
import InviteFriend from '../views/InviteFriend.vue';
import TotalAirdropBalance from '../views/TotalAirdropBalance.vue';

const routes = [
  { path: '/', redirect: '/point-mining' },
  { path: '/point-mining', name: 'PointMining', component: PointMining },
  { path: '/task', name: 'Task', component: Task },
  { path: '/invite-friend', name: 'InviteFriend', component: InviteFriend },
  { path: '/total-airdrop-balance', name: 'TotalAirdropBalance', component: TotalAirdropBalance },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
