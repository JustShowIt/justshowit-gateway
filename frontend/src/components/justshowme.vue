<template>
  <component :is="getComponentType()" :unit="unit">
    <slot></slot>
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </component>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme'
}
</script>