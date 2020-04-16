<template>
  <div id="justshowme">
    <!--<router-view/>-->
    <Search v-on:request="update" />
    <justshowme :unit="unit" v-if="unit" />
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { justshowme } from '../package.json'
// import { dynamicMock } from '@/mock/mockData'

export default {
  data () {
    return  {
      unit: null
    }
  },
  created () {

    const req = require.context('./components/', true, /\.(js|vue)$/i);
    req.keys().map(key => {
      //const name = key.match(/\w+/)[0]
      return Vue.component(req(key).default.name, req(key).default)
    })

  },
  mounted () {

    let params = window.location.search.substr(1).split('&')
    let address = null

    if (params.length && params[0] !== '') {

      address = params.filter(param => {
        return param.search('justshowme=') !== -1
      }).map(param => {
        return decodeURIComponent(param);
      })[0]

      if (address) {
        address = address.split('=')[1]
      }

    }
    
    if (address) {
      try {
        const url = justshowme.gateway + justshowme.dataPath
        axios.get(url, {
          headers: {
            'justshowme-service-request-uri': address
          }
        }).then(json => {
          this.unit = json
        })
      } catch (e) {
        throw new Error(e)
      }
    }

  },
  methods: {
    update(data) {
      this.unit = data
    }
  }
}
</script>

<style lang="scss">
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  html, 
  body { 
    width: 100%;
    height: 100%;
    font-size: 16px;
  }
  body {
    background: #111;
    background-image: url(http://www.laboratoriocondemorales.com/app/lib/frm/img/admin/background.jpg);
    background-size: cover;
    color: #e8c5a1;
    position: relative;
  }

  #justshowme {
    position: absolute;
    top: 3.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1em;

    [class^="justshowme-"] {
      border: 1px solid rgba(0,0,0,.5);
      padding: .5em;
      margin: .5em;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .hide {
    display: none;
  }
</style>
