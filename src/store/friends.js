import {find, getWall} from '~/api/friends'

export default {
	namespaced: true,
	state: {
		list: [],
		errorText: null,
    inProcess: false,
    waitText: null,
    wallList: [],
    errorWallText: null,
    waitWallText: null,
  },
  getters: {
    findInd: (state) => (id) => state.list.findIndex(friend => friend.id == id),
    findData: (state, getters) => (id) => {
      let ind = getters.findInd(id);
      return ind !== -1 ? state.list[ind] : null;
    },
    sortedByName: (state) => {
      if(state.list.length > 1){
        return _.orderBy(state.list, ['first_name', 'last_name'], ['asc', 'asc']);
      } else if(state.list.length === 1){
        return state.list;
      } else {
        return null;
      }
    }
  },
  mutations: {
    add(state, {id, first_name, last_name, isFriendOf}){
      let ind = state.list.findIndex(friend => friend.id == id);
      if(ind != -1){
        state.list[ind].isFriendOf.push(isFriendOf[0]);
      } else {
        state.list.push({id, first_name, last_name, isFriendOf});
      }
      if(state.errorText){
        state.errorText = null;
      }
    },
    clear(state){
      state.list.splice(0);
    },
    clearWallList(state){
      state.wallList.splice(0);
    },
    addErr(state,{error_msg}){
      state.errorText = error_msg;
    },
    addWallErr(state,{error_msg}){
      state.errorWallText = error_msg;
    },
    wait(state,{wait_msg}){
      state.waitText = wait_msg;
    },
    waitWall(state,{wait_msg}){
      state.waitWallText = wait_msg;
    },
    startProcess(state){
			state.inProcess = true;
		},
		stopProcess(state){
			state.inProcess = false;
    },
    addWallText(state, {date, post, repost}){
      state.wallList.push({date, post, repost});
    }
	},
	actions: {
    add(store){
      if(store.rootGetters['users/hasChecked']){
        store.commit('startProcess');
        store.commit('addErr', {error_msg: null});
        store.commit('wait', {wait_msg: 'Ждите...'});
        store.commit('clear');
        let checkedUsersIds = store.rootGetters['users/checkedIds'];
        (async function asuncAdd(){
          for(let userId of checkedUsersIds){
            await find({id: userId}).then((res) => {
              if(res.response){
                if(res.response.items){
                  res.response.items.forEach(item => {
                    if(!item.deactivated && !store.rootGetters['users/isAdded'](item.id)){
                      store.commit('add', {...item, isFriendOf: [userId]});
                    }
                  });
                } 
              } 
            });
          }
          store.commit('wait', {wait_msg: null});
          if(store.state.list.length == 0){
            store.commit('addErr', {error_msg: 'Друзья не найдены или скрыты'});
          }
          store.commit('stopProcess');
        })(); 
      }
    },
    getData(store, {id}){
      store.commit('addWallErr', {error_msg: null});
      store.commit('waitWall', {wait_msg: 'Ждите...'});
      store.commit('clearWallList');
      (async function asuncGet(){
        await getWall({id}).then((res) => {
          if(res.response){
            if(res.response.items){
              res.response.items.forEach(item => {
                if(item.date && item.text && !item.copy_history){
                  store.commit('addWallText', {
                    date: item.date,
                    post: item.text,
                    repost: null
                  });
                } else if(item.date && !item.text && item.copy_history){
                  if(item.copy_history[0].text){
                    store.commit('addWallText', {
                      date: item.date,
                      post: null,
                      repost: item.copy_history[0].text
                    });
                  }
                } else if(item.date && item.text && item.copy_history){
                  if(item.copy_history[0].text){
                    store.commit('addWallText', {
                      date: item.date,
                      post: item.text,
                      repost: item.copy_history[0].text
                    });
                  }
                }
              });
            } 
          }
        });
        store.commit('waitWall', {wait_msg: null});
        if(store.state.wallList.length == 0){
          store.commit('addWallErr', {error_msg: 'Записи на стене не найдены или скрыты'});
        }
      })(); 
    },
    clearList(store){
      store.commit('clear');
    }
	}
};