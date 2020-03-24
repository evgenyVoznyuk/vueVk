<template>
  <v-container>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <FriendCard/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
 import {mapState, mapGetters, mapActions} from 'vuex';
 import FriendCard from '~c/FriendCard';
  export default {
    components: {
      FriendCard
    },
    computed: {

    }
  }
</script>
