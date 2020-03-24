import {find, countFriends} from '~/api/users'

export default {
	namespaced: true,
	state: {
    list: [],
    errorText: null,
    inProcess: false
  },
  getters: {
    findInd: (state) => (id) => state.list.findIndex(user => user.id == id),
    isAdded: (state, getters) => (id) => getters.findInd(id) != -1,
    checked: (state) => state.list.filter(user => user.checked),
    hasChecked: (state, getters) => getters.checked.length > 0,
    checkedIds: (state, getters) => getters.checked.map(user => user.id),
    getSex: (state, getters) => (id) => {
      let ind = getters.findInd(id);
      let sexId = state.list[ind].sex;
      let sexName = 'н/д';
      switch (sexId) {
        case 1:
          sexName = 'женский';
          break;
        case 2:
          sexName = 'мужской';
          break;
      }
      return sexName;
    },
    getAge: (state,getters) => (id) => {
      let ind = getters.findInd(id);
      let bDate = state.list[ind].bdate;
      if(bDate){
        let d = bDate.split('.');
        if (d[2]){
          let date = d[2]+'.'+d[1]+'.'+d[0];
          return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
        }
      }
      return 'н/д';
    },
    getFriendsCountValue: (state, getters) => (id) => {
      let ind = getters.findInd(id);
      let friendsCount = state.list[ind].friendsCount;
      let value = 'н/д';
      if(friendsCount){
        value = friendsCount;
      }
      return value;
    },
    getNames: (state, getters) => (ids) => {
      return ids.map((id) => {
          let ind = getters.findInd(id);
          return `${state.list[ind].first_name} ${state.list[ind].last_name}`
          }).join(', ');
    },
    sortedByName: (state) => _.orderBy(state.list, ['first_name', 'last_name'], ['asc', 'asc'])
  },
  mutations: {
    add(state, {id, first_name, last_name, sex, bdate, friendsCount}){
      state.list.push({
        id, 
        first_name, 
        last_name, 
        sex,
        bdate,
        friendsCount,
        checked: false});
      if(state.errorText){
        state.errorText = null;
      }
    },
    delete(state, ind){
      state.list.splice(ind, 1);
    },
    check(state, ind){
      state.list[ind].checked = true
    },
    clearAllChecked(state){
      state.list.forEach(user => user.checked = false);
    },
    addErr(state,{error_msg}){
      switch (error_msg) {
        case 'Invalid user id':
          state.errorText = 'Пользователь не найден';
          break;
        case 'Deleted':
          state.errorText = 'Пользователь удален';
          break;
        case 'Is added':
          state.errorText = 'Пользователь уже добавлен';
          break;
        case 'Banned':
          state.errorText = 'Пользователь заблокирован';
          break;
        default:
          state.errorText = errorMsg;
      }
    },
    startProcess(state){
			state.inProcess = true;
		},
		stopProcess(state){
			state.inProcess = false;
		}
	},
	actions: {
    add(store, payload){
      store.commit('startProcess');
      find(payload).then((res) => {
        if(res.response){
          if(res.response[0].deactivated === 'deleted'){
            store.commit('addErr', {error_msg: 'Deleted'});
          } else if(res.response[0].deactivated === 'banned'){
            store.commit('addErr', {error_msg: 'Banned'});
          } else {
            if(!store.getters.isAdded(res.response[0].id)){
              let data = res.response[0];
              countFriends(payload).then((res) => {
                let friendsCount = null;
                if(res.response){
                  friendsCount = res.response.count
                  data = {...data, friendsCount}
                }
                store.commit('add', data);
              })
            } else {
              store.commit('addErr', {error_msg: 'Is added'});
            }
          }
        } else if(res.error){
          store.commit('addErr', res.error);
        }
        store.commit('stopProcess');
      })
    },
    toggle(store, {checkedIds}){
      store.commit('clearAllChecked');
      checkedIds.forEach(id => {
        let ind = store.getters.findInd(id)
        store.commit('check', ind);
      }) 
    },
    delete(store,{id}){
      let ind = store.getters.findInd(id);
      store.commit('delete', ind);
      if(store.state.list.length == 0){
        store.commit('friends/clear', null, {root: true});
        store.commit('friends/addErr', {error_msg: null}, {root: true});
      }
    }
	}
};