<template>
  <div class="container" id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {
  public mounted() {
    if (localStorage.getItem('hpv-order')) {
      this.$store.replaceState({
        ...this.$store.state,
        order: JSON.parse(localStorage.getItem('hpv-order') as string)
      });
    }
  }
}
</script>


<style lang="scss">
$fa-font-path: '~@fortawesome/fontawesome-free/webfonts/';

@import '~@fortawesome/fontawesome-free/scss/fontawesome';
@import '~@fortawesome/fontawesome-free/scss/solid';

@import '~bulma';
@import '~bulma-badge';
</style>
