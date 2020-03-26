<template>
	<v-form @submit.prevent="submit($event)">
    <v-text-field 
      id="addField" 
      label="ID пользователя"
      :error-messages="users.errorText"
    >
      <template v-slot:append>
        <v-btn
          type="submit"
          depressed
          tile
          color="primary"
          min-width="130px"
          :disabled="users.inProcess"
        >
          добавить
        </v-btn>
      </template>
    </v-text-field>
	</v-form>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  
	export default {
		computed: {
      ...mapState({users: state => state.users}),
    },
    methods: {
      ...mapActions('users', {addUser: 'add'}),
      submit(e){
        if(!this.users.inProcess){ 
          let id = e.target.elements.addField.value.trim();
          this.addUser({id});
        }
      }
		}
	}
</script>