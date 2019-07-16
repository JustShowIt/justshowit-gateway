<template>
  <div class="justshowme-debug">
    <div v-for="(text, index) in formattedContent" :key="index">{{text}}</div>
    <justshowme v-for="childUnit in unit.units" :key="childUnit.id" :unit="childUnit" />
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-debug',
  computed: {
    formattedContent () {
      let formattedContent = []      
      Object.keys(this.unit).forEach((option) => {
        formattedContent.push(this.unit[option])
      });
      return formattedContent
    }
  }
}
</script>

<style scoped lang="scss">
  .justshowme-debug {
    background: rgba(0,0,0,.5);
    border: 1px solid rgba(0,0,0,.5);
    padding: .5em;
    margin: .5em;
    color: #e8c5a1;
  }
</style>
