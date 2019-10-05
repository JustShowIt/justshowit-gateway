<template>
  <div class="justshowme-unit">
    <justshowme-training></justshowme-training>
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'
import justshowmeTraining from '@/components/justshowme-training'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-unit',
  components: {
    justshowmeTraining
  }
}
</script>

<style scoped lang="scss">
  .justshowme-unit {
    color: #e8c5a1;
  }
</style>
