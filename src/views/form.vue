<template>
    <div>
        <h3>具有数据检验功能的表单组件--Form</h3>
        <x-form ref="form" :model="formValidate" :rules="ruleValidate">
            <x-form-item label="用户名" prop="name">
                <x-input v-model="formValidate.name"></x-input>
            </x-form-item>
            <x-form-item label="邮箱" prop="mail">
                <x-input v-model="formValidate.mail"></x-input>
            </x-form-item>
        </x-form>
        <button @click="handleSubmit">提交</button>
        <button @click="handleReset">重置</button>
    </div>
</template>
<script>
    import xForm from '../components/form/form.vue'
    import xFormItem from  '../components/form/form-item.vue'
    import xInput from '../components/input/input.vue'

    export default {
        components: {xForm, xFormItem, xInput},
        data(){
            return {
                formValidate: {
                    name: '',
                    mail: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit (){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        window.alert('提交成功')
                    }else{
                        window.alert('表单校验失败')
                    }
                })
            },
            handleReset(){
                this.$refs.form.resetFields()
            }
        }
    }
</script>