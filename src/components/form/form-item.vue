<template>
    <div>
        <label v-if="label" :class="{ 'x-form-item-label-required': isRequired }">{{ label }}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="x-form-item-message">{{ validateMessage }}</div>
        </div>
    </div>
</template>
<script>
    import AsyncValidator from 'async-validator'
    import Emitter from '../../mixins/emitter'
    export default {
        name: 'xFormItem',
        mixins: [Emitter],
        inject: ['form'],
        props: {
            label: {  // 单个表单组件的标签文本，
                type: String,
                default: ''
            },
            prop: {   // 对应表单域Form组件model里的字段，用于在校验或重置时访问表单组件绑定的数据

                type: String
            }
        },
        data(){
            return {
                isRequired: true,
                validateState: '', // 校验状态
                validateMessage: '', // 校验不通过时的提示信息
            }
        },
        computed :{
          // 从Form的model中动态得到当前表单组件的数据
          fieldValue(){
              return this.form.model[this.prop]
          }
        },
        mounted() { // 组件渲染时，将实例缓存在Form中
            if(this.prop){  // 如果没有传入prop，则无需校验，
                this.dispatch('xForm','on-form-item-add', this)

                // 设置初始值，以便重置时恢复默认值
                this.initialValue = this.fieldValue

                this.setRules()
            }
        },
        beforeDestroy() { // 组件销毁前，将实例从Form的缓存中移除
            this.dispatch('xForm', 'on-form-item-remove',this)
        },
        methods: {
            setRules () {
                let rules = this.getRules()
                if(rules.length) {
                    rules.every((rule)=>{
                        this.isRequired = rule.required
                    })
                }
                this.$on('on-form-blur', this.onFieldBlur)
                this.$on('on-form-change',this.onFieldChange)
            },

            getRules (){ // 从Form的rules属性中，获取当前FormItem的校验规则
                let formRules = this.form.rules

                formRules = formRules ? formRules[this.prop] : []

                return [].concat(formRules || [])
            },

            getFilteredRule (trigger) {
                const rules = this.getRules()
                // 触发方式只支持blur和change，所以要过滤出符合要求的rule规则
                return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
            },

            // 重置数据
            resetField() {
              this.validateState = ''
              this.validateMessage = ''

              this.form.model[this.prop] = this.initialValue
            },

            // 校验数据， trigger校验类型，callback回调函数
            validate(trigger, callback = function () {}){
                let rules = this.getFilteredRule(trigger)

                if(!rules || rules.length === 0){
                    return true
                }

                // 设置状态为检验中
                this.validateState = 'validating'

                // 下面是async-validator库的调用方法
                let descriptor = {}
                descriptor[this.prop] = rules

                const validator = new AsyncValidator(descriptor)
                let model = {}

                model[this.prop] = this.fieldValue

                validator.validate(model, {firstFields: true}, errors => {
                    this.validateState = !errors ? 'success' : 'error'
                    this.validateMessage = errors ? errors[0].message : ''

                    callback(this.validateMessage)
                })
            },
            onFieldBlur(){
                this.validate('blur')
            },
            onFieldChange(){
                this.validate('change')
            }
        },
    }
</script>
<style>
    .x-form-item-label-required:before {
        content: '*';
        color: red;
    }
    .x-form-item-message {
        color: red;
    }
</style>