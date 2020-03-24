<template>
  <div>
    <h3 v-if="showWait">{{friends.waitText}}</h3>
    <h3 v-if="showErr">{{friends.errorText}}</h3>
    <v-card tile v-if="showList">
      <v-card-title>Друзья</v-card-title>
      <v-list class="pa-0">
        <template v-for="(friend, i) in sortedFriends">
          <v-list-item
            :key="friend.id"
            dense
            class="sorted-colored"
            :style="cssVars(friend.isFriendOf.length)"
            @click="goToFriend(friend.id)"
          >
            {{friend.first_name}} 
            {{friend.last_name}}
          </v-list-item>
          <v-divider
            :key="`divider-${i}`"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState({friends: state => state.friends}),
      ...mapGetters('friends', {sortedFriends: 'sortedByName'}),
      cssVars: () => (friendsUsers) => {
        if(friendsUsers <= 6){
          return {
          '--lightness': `${100 - friendsUsers * 10}%`
          }
        } else {
          return {
          '--lightness': '40%'
          }
        }
      },
      showWait(){
        return this.friends.waitText
      },
      showErr(){
        return this.friends.errorText && !this.friends.waitText && this.friends.list.length == 0
      },
      showList(){
        return this.friends.list.length > 0 && !this.friends.waitText && !this.friends.errorText
      }
    },
    methods: {
      ...mapActions('friends', {getOne: 'getData'}),
      goToFriend(id){
        this.getOne({id});
        this.$router.push({name: 'friend', params: {id}})
      }
		}
	}
</script>

<style scoped>
  .sorted-colored {
    background-color: hsl(209, 50%, var(--lightness));
  }
</style>