<template>
  <a  class="justshowme-link" 
      v-bind:class="{ hide: this.hasParams() }"
      v-bind:href="url"
  >
    <justshowme-training></justshowme-training>
    {{title}}
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </a>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'
import justshowmeTraining from '@/components/justshowme-training'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-link',
  components: {
    justshowmeTraining
  },
  computed: {
    url () {
      if (this.hasParam('url')) {
        return this.getParam('url');
      }
      return '#';
    },
    title () {
      if (this.hasParam('title')) {
        return this.getParam('title');
      } else if (this.hasParam('url')) {
        return this.getParam('url');
      }
      return '...';
    }
  }
}
</script>

<style scoped lang="scss">
  .justshowme-link {
    display: block;
    color: #e8c5a1;
    text-decoration: none;
    
    &:hover {
      background: rgba(255,255,255,.1);
    }
  }
</style>
