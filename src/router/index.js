import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Users from '~v/Users';
import Friend from '~v/Friend';
import E404 from '~v/E404';

let routes = [
	{
		path: '/',
		redirect: '/users'
	},
	{
		name: 'users',
		path: '/users',
		component: Users
	},
	{
		name: 'friend',
		path: '/friend/:id',
		component: Friend
	},
	{
		path: '*',
		component: E404
	}
];

export default new VueRouter({
	mode: 'history',
	routes
});