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
        hasParams () {
            return this.getParams().length ? true : false
        },
        hasUnits () {
          return (this.unit.hasUnits)
        }
    }
}