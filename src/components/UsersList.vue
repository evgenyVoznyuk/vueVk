<template>
	<v-card tile>
    <v-card-title>Пользователи</v-card-title>
    <v-list class="pa-0">
      <v-list-item-group
        multiple
        v-model="checked"
      >
        <template v-for="(user, i) in sortedByName">
          <v-list-item
            :key="user.id"
            :value="user.id"
          >
            <template v-slot:default="{active}">
              <v-list-item-content>
                <v-list-item-title>
                  {{user.first_name}} {{user.last_name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Пол: {{userSex(user.id)}} | 
                  Возраст: {{userAge(user.id)}} |
                  Друзей: {{friendsCount(user.id)}}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="mr-4">
                <v-checkbox
                  :input-value="active"
                  :true-value="user.id"
                  dense
                >
                </v-checkbox>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn small depressed text color="red"
                  :value="user.id"
                  @click="deleteUser($event)"
                >
                  X
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            :key="`divider-${i}`"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState({users: state => state.users}),
      ...mapGetters('users', {
        checkedIds: 'checkedIds',
        userSex: 'getSex',
        userAge: 'getAge',
        friendsCount: 'getFriendsCountValue',
        sortedByName: 'sortedByName'
      }),
      checked: {
        get () {
          return this.checkedIds;
        },
        set (checkedIds) {
          this.toggle({checkedIds});
        }
      }
    },
    methods: {
      ...mapActions('users', 
      {
        toggle: 'toggle',
        delete: 'delete'
      }),
      deleteUser(e){
        this.delete({id: e.currentTarget.value})
      }
		}

	}
</script>

<style scoped>

</style>