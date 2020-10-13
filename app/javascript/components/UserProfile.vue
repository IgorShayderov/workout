<template>
  <div class="user-profile">
    <div class="user-profile__avatar">

    </div>

    <div class="user-profile__info">
      <p>Name: {{ userInfo.name }}</p>
      <p>E-mail: {{ userInfo.email }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    
  },
  computed: {
    ...mapGetters('system',
      ['getUserInfo']
    ),
    userInfo() {
      return this.getUserInfo;
    }
  }
}
</script>

<style scoped>
.user-profile {
  margin: 0 2vw;
  display: flex;
}

.user-profile__avatar {
  margin: 0 1vw;
  border: 1px solid black;
  width: 200px;
  height: 300px;
}
</style>
