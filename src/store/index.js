import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import users from '~s/users.js';
import friends from '~s/friends.js';

export default new Vuex.Store({
	modules: {
		users,
		friends
	},
	strict: process.env.NODE_ENV !== 'production'
});