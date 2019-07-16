<template>
  <div class="justshowme-unit">
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-unit'
}
</script>

<style scoped lang="scss">
  .justshowme-unit {
    color: #e8c5a1;
  }
</style>
