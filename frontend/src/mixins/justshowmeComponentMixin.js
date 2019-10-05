import axios from 'axios'
import { justshowme } from '../../package.json'

export default {
    props: {
        unit: {
            type: Object,
            required: true
        }
    },
    methods: {
        getComponentType () {
            const prefix = 'justshowme'
            return this.unit && this.unit.type ? `${prefix}-${this.unit.type.toLowerCase()}` : `${prefix}-debug`
        },
        getParams () {
            return this.unit.params ? this.unit.params : {}
        },
        getParam (param) {
            return this.unit.params[param];
        },
        hasParams () {
            return this.getParams().length ? true : false
        },
        hasParam (param) {
            return this.getParam(param) ? true : false
        },
        hasUnits () {
            return (this.unit.hasUnits)
        },
        addInputTypeTrainingData () {
            const url = justshowme.gateway + justshowme.addInputTypeTrainingDataPath
            return axios.post(url, {
                value: 'value test'
            })
        }
    }
}