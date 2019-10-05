<template>
  <div class="justshowme-training">
    <select v-model="selectedInputType" @change="addInputTypeTrainingData(selectedInputType)">
      <option></option>
      <option v-for="type in ['list', 'text', 'video', 'link', 'image', 'article']" :key="type" v-html="type"></option>
    </select>
  </div>
</template>

<script>
import justshowmeComponentMixin from '@/mixins/justshowmeComponentMixin'

export default {
  mixins: [ justshowmeComponentMixin ],
  name: 'justshowme-training',
  data () {
    return {
      selectedInputType: null
    }
  }
}
</script>

<style scoped lang="scss">
  .justshowme-training {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    select {
      background: #e0cbb7;
      color: #111;
      border: none;
      padding: 5px 10px;
    }
  }
</style>
