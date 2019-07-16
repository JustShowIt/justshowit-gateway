<template>
  <Search v-on:request="update" />
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'JustShowMeAddressInput',
  components: {
    Search
  }
}
</script>
