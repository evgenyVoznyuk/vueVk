<template>
  <v-container>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <AddUserField/>
          <UsersList v-if="hasUsers"/>
          <v-row justify="end" class="pa-3" v-if="hasUsers">
            <v-btn
              depressed
              tile
              outlined
              min-width="130px"
              color="primary"
              @click="getFriends"
              :disabled="friends.inProcess || !hasChecked"
            >Построить</v-btn>
          </v-row>
          <FriendsList v-if="hasUsers"/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import AddUserField from '~c/AddUserField';
  import UsersList from '~c/UsersList';
  import FriendsList from '~c/FriendsList';

  export default {
    components: {
      AddUserField,
      UsersList,
      FriendsList
    },
    computed: {
      ...mapState({
        users: state => state.users,
        friends: state => state.friends
      }),
      ...mapGetters({
        hasChecked: 'users/hasChecked'
      }),
      hasUsers(){
        return this.users.list.length > 0
      }
    },
    methods:{
      ...mapActions('friends', {getFriends: 'add'}),
    }
  }
</script>