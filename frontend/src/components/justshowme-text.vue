<template>
  <div class="justshowme-text" v-bind:class="{ hide: this.hasParams() }">
    {{getParams().text}}
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-text'
}
</script>

<style scoped lang="scss">
  .justshowme-text {
    color: #e8c5a1;
  }
</style>
