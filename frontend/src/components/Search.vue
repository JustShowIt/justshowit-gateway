<template>
  <div class="search">
    <input class="search-address-input" type="text" :value="value" :placeholder="placeholder" @keyup.enter="submit(value)" />
  </div>
</template>

<script>
import axios from 'axios'
import { justshowme } from '../../package.json'

export default {
  name: 'Search',
  props: {
    value: {
      type: String,
      // default: 'http://localhost:9001/test'
      default: 'http://dataservice:9001/test'
    },
    placeholder: {
      type: String,
      default: 'http://'
    }
  },
  methods: {

    async submit (address) {
      await axios.get(justshowme.gateway + justshowme.dataPath, {
        headers: {
          'justshowme-service-request-uri': address,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => {
        this.$emit('request', response.data);
      })
    }

  }
}
</script>

<style scoped lang="scss">
  .search {
    background: rgba(0,0,0,.25);
    padding: .3em;
    margin-bottom: 1em;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.2);
    box-shadow: 0 0 1em 0 rgba(0,0,0,.5);
    border-radius: 2px; 
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    
    .search-address-input {
      border: 0;
      background: rgba(67, 40, 19,.3);
      padding: 0 1em;
      height: 3em;
      color: #e8c5a1;
      outline: none;
      width: 40em;
      transition: all .2s ease-in-out;
      border-radius: 2px; 
    
      &:hover {
        color: #dad3cb;
        box-shadow: inset 0 0 0.1em 0.1em #bb9b69;
      }

      &:focus,
      &:active {
        background: rgb(218, 197, 173);
        color: #51331a;
      }

    }
  }
</style>
