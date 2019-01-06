<template>
    <form>
        <slot></slot>
    </form>
</template>
<script>
    export default {
        name: 'xForm',
        data(){
            return {
                fields: []  // 缓存所有的FormItem实例
            }
        },
        provide(){
            return {
                form : this
            }
        },
        props: {
            model: {   // 表单控件绑定的数据类型，在校验或重置时会访问该数据对象下对应的表单数据，
                type: Object
            },
            rules: {   // 表单验证规则，就是async-validator所用的校验规则
                type: Object
            }
        },
        created() {
            this.$on('on-form-item-add', (field) => {
                if(field){
                    this.fields.push(field)
                }
            })
            this.$on('on-form-item-remove',(field) => {
                if(field.prop){
                    this.fields.splice(this.fields.indexOf(field), 1)
                }
            })
        },
        methods: {
            // 全部重置数据
            resetFields() {
                this.fields.forEach(field => {
                    field.resetField()
                })
            },

            // 全部校验数据，支持Promise
            validate(callback) {
                return new Promise(resolve => {
                    let valid = true
                    let count = 0
                    this.fields.forEach(field => {
                        field.validate('',errors => {
                            if(errors){
                                valid = false
                            }
                            if(++count === this.fields.length){
                                // 全部完成
                                resolve(valid)

                                if(typeof callback === 'function'){
                                    callback(valid)
                                }
                            }
                        })
                    })
                })
            }
        }
    }

</script>
<style></style>