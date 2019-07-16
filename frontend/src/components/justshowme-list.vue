<template>
  <div class="justshowme-list">
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-list'
}
</script>

<style scoped lang="scss">
  .justshowme-list {
    color: #e8c5a1;
    margin: 2em;

    & * ~ * {
      border-top: 1px solid #e8c5a1;
      margin-top: 1em;
      padding-top: 1em;
    }
  }
</style>
