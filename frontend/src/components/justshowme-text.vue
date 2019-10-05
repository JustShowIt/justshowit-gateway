<template>
  <div class="justshowme-text" v-bind:class="{ hide: this.hasParams() }">
    <justshowme-training></justshowme-training>
    {{getParams().text}}
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'
import justshowmeTraining from '@/components/justshowme-training'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-text',
  components: {
    justshowmeTraining
  }
}
</script>

<style scoped lang="scss">
  .justshowme-text {
    color: #e8c5a1;
  }
</style>
