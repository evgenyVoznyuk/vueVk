<template>
  <div v-if="isFind">
    <v-card tile>
      <v-card-title class="display-1">
        {{friend.first_name}} <br v-if="$vuetify.breakpoint.xsOnly"/>
        {{friend.last_name}}
      </v-card-title>
      <v-card-subtitle>
        Дружит c: {{getNames(friend.isFriendOf)}}
      </v-card-subtitle>
      <v-row justify="center" class ="mx-0">
        <v-card-title v-if="showPosts">
          Записи на стене
        </v-card-title>
        <v-card-title v-if="showWait">
          {{friends.waitWallText}}
        </v-card-title>
        <v-card-title v-if="showErr">
          {{friends.errorWallText}}
        </v-card-title>
      </v-row>
      <v-window show-arrows v-if="showPosts">
        <v-window-item
          v-for="(item, i) in friends.wallList"
          :key="`card-${i}`"
          class="fill-height"
          :class="{'px-12': $vuetify.breakpoint.smAndUp}"
        >
          <v-card min-height="500" flat tile>
            <v-row
              class= fill-height mx-4
              tag="v-card-text"
            >
              <v-card-text>
                <div class="text--primary">
                  {{getDate(item.date)}}
                </div>
                <div v-if="item.post">
                  <div class="text--primary">
                    Пост
                  </div>
                  <p>{{item.post}}</p>
                </div>
                <div v-if="item.repost">
                  <div class="text--primary">
                    Репост
                  </div>
                  <p>{{item.repost}}</p>
                </div>
              </v-card-text>
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    <v-row class="pa-3">
      <v-btn
        depressed
        tile
        outlined
        min-width="130px"
        color="primary"
        :to="{name: 'users'}"
        :block="$vuetify.breakpoint.xsOnly"
      >Назад к пользователям</v-btn>
    </v-row>
  </div>
  <E404 v-else></E404>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import E404 from '~v/E404';

  export default {
    components: {
			E404
		},
    computed: {
      ...mapState({
        friends: state => state.friends,
        users: state => state.users,
      }),
      ...mapGetters({
        getFriendData: 'friends/findData',
        getNames: 'users/getNames',
			}),
      id(){
				return this.$route.params.id;
      },
      friend(){
				return this.getFriendData(this.id);
      },
      getDate: () => (date) => {
        return new Date(date * 1000).toLocaleString();
      },
      isFind(){
				return this.friend !== null;
      },
      showWait(){
        return this.friends.waitWallText
      },
      showErr(){
        return this.friends.errorWallText && !this.friends.waitWallText && this.friends.wallList.length == 0
      },
      showPosts(){
        return this.friends.wallList.length > 0 && !this.friends.waitWallText && !this.friends.errorWallText
      }
    }
	}
</script>