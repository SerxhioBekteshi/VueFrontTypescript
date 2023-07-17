<template>
    <div class="grid">
        <div class="col-12 sm:col-4 md:col-4" style="display: flex; justify-content: center;"
            v-for="button in  questionType " :key="button.id">
            <Button :id="button.id.toString()" @click="openDrawerFunction(button.type)" :label="button.type"
                style="width: 100%;" />
        </div>
    </div>
    <div v-for="(question, index) in quizQuestion" :key="question.id">
        <div class="flex flex-start gap-3">
            <div>
                <Tag severity="success" style="font-size: 1rem;"> {{ `${index + 1}: ${question.questionName}` }}
                </Tag>

            </div>
            <div class="flex gap-2">
                <Button @click="updateQuestion(question.id, question)" severity="warning" size="small"
                    style="padding: 3.5px 5.6px;" icon="pi pi-angle-double-right" />
                <Button @click="handleRemoveQuestionQuiz(question.id)" severity="danger" size="small"
                    style="padding: 3.5px 5.6px;" icon="pi pi-delete-left" />

            </div>
        </div>
        <div class=" mb-3 mt-3 flex  quizContent" style="width: 100%S;" v-if="question.fieldType === 'select'">
            <div>
                <Listbox style="width: 100%;" :options="JSON.parse(JSON.stringify(question.fieldAnswers)).map((element: any) => { return { label: element.label, value: element.value } }
                )" optionLabel="label" class="w-full md:w-14rem" />
            </div>
        </div>


        <div v-if="question.fieldType === 'radio'" class=" mb-3 mt-3 flex ">
            <div class="flex gap-5">
                <div class="flex align-items-center" v-for="field in question.fieldAnswers" :key="field._id">
                    <RadioButton :inputId="field.value" :value="field.value" />
                    <label :for="field.value" class="ml-2">{{ field.label }}</label>
                </div>
            </div>
        </div>

        <div v-if="question.fieldType === 'checkbox'" class="mb-3 mt-3 flexlex ">
            <div class="flex gap-3">
                <div class="flex align-items-center" v-for="field in question.fieldAnswers" :key="field._id">
                    <Checkbox :inputId="field.value" :value="field.label" />
                    <label :for="field.value" class="ml-2">{{ field.label }}</label>
                </div>
            </div>
        </div>

        <!-- :options="question.fieldAnswers.map((element: any) => { return { value: element.value, label: element.label } })"  -->
    </div>

    <Drawer v-model:openDrawer="openDrawer" @handleClose="handleCloseDrawer" :title="'Question Type'"
        :actions="drawerActions">
        <form>
            <div class="flex flex-wrap  mb-3 gap-1">
                <label for="question" style="font-weight: bold;">Determine the question</label>
                <InputText :style="{ width: '100%', borderColor: v$.question.$error ? 'red' : '' }" class="fullWidth"
                    id="question" placeholder="Question" v-model="question" />
                <ValidationError v-if="v$.question.$error" style="width: 100%; background: none;" severity="error">{{
                    v$.question.$errors[0].$message }}
                </ValidationError>
            </div>

            <div class="flex flex-wrap  mb-3 gap-1">
                <label style="font-weight: bold;" for="questionOptions">Give the options</label>
                <InputText v-tooltip="'Values should be separated with comma'"
                    :style="{ width: '100%', borderColor: v$.questionOptions.$error ? 'red' : '' }" class="fullWidth"
                    id="questionOptions" placeholder="questionOptions" v-model="questionOptions" />
                <ValidationError v-if="v$.questionOptions.$error" style="width: 100%; background: none;" severity="error">{{
                    v$.questionOptions.$errors[0].$message }}
                </ValidationError>
            </div>

        </form>
    </Drawer>
</template>
  
<script lang="ts">
import Button from "primevue/button"
// import Select from "primevue/select"
import RadioButton from "primevue/radiobutton"
import Checkbox from "primevue/checkbox"
import Listbox from "primevue/listbox"

import InputText from "primevue/inputtext"
import Drawer from "../components/Drawer.vue"
import { compile, defineComponent } from "vue"
import ValidationError from "../components/ValidationError.vue"
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import axios from "axios"
import Tag from 'primevue/tag';


export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Quiz",
    components: { Button, Drawer, InputText, RadioButton, Checkbox, Listbox, Tag, ValidationError },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    data() {
        return {
            openDrawer: false,
            typeOfQuestionToSubmit: "",
            quizQuestion: [] as any,
            v$: useVuelidate(),
            question: "",
            questionOptions: "",
            drawerActions: [
                { component: Button, props: { type: 'Submit', icon: "pi pi-times", label: 'Submit', severity: 'primary', onClick: this.submitForm, } },
                { component: Button, props: { label: 'Cancel', icon: "pi pi-check", severity: 'info', onClick: this.handleCloseDrawer } }
            ],
            questionType: [
                // { id: 1, type: "text", },
                { id: 1, type: "select" },
                { id: 2, type: "radio" },
                { id: 3, type: "checkbox" },

            ]
        }
    },
    validations() {
        return {
            question: { required: helpers.withMessage('Field is required', required) },
            questionOptions: { required: helpers.withMessage('Field should be completed with the values you want to show', required) }

        }
    },
    computed: {

    },
    mounted() {
        this.getQuiz()
    },
    methods: {
        openDrawerFunction(inputType: string) {
            this.openDrawer = true
            this.typeOfQuestionToSubmit = inputType
        },

        handleCloseDrawer() {
            this.openDrawer = false;
            // (this as any).$v.reset()
        },
        async getQuiz() {
            try {
                const res = await axios.get("/quiz/get-all")
                if (res.data.message) {
                    console.log(res.data.quiz)
                    this.quizQuestion = res.data.quiz
                }
            }
            catch (err: any) {
                this.$toast.open({
                    type: "error",
                    message: err,
                    duration: 3000,
                    position: "top-right"
                })
            }

        },
        async handleRemoveQuestionQuiz(id: number) {
            try {
                const res: any = await axios.delete(`/quiz/delete/${id}`)
                if (res.data.message) {
                    this.$toast.open({
                        type: "success",
                        message: res.data.message,
                        duration: 3000,
                        position: "top-right"
                    })
                    this.getQuiz()
                }
            } catch (err) {
                console.log(err, 'errererer')
            }

        },
        async updateQuestion(id: number, question: any) {
            this.openDrawer = true;
            this.question = question.questionName;
            this.questionOptions = question.fieldAnswers.map((field: any) => field.label).join(',');
        },
        async submitForm() {
            this.v$.$validate()

            if (this.v$.$errors.length != 0) {
                return;
            }

            let optionsWithValuesAndLabel
            if (this.questionOptions) {
                optionsWithValuesAndLabel = this.questionOptions.split(',').map((element: string) => {
                    return {
                        value: element,
                        label: element
                    }
                })
            }
            try {
                const res: any = await axios.post("/quiz/post", {
                    question: this.question,
                    questionType: this.typeOfQuestionToSubmit,
                    questionOptions: optionsWithValuesAndLabel
                })
                if (res.data.message) {
                    this.$toast.open({
                        type: "success",
                        message: res.data.message,
                        duration: 3000,
                        position: "top-right"
                    })
                    this.handleCloseDrawer()

                }
            }
            catch (err: any) {
                this.$toast.open({
                    type: "error",
                    message: err,
                    duration: 3000,
                    position: "top-right"
                })
            }
        },
        // renderField(question: any, index: number) {
        //     console.log(JSON.parse(JSON.stringify(question.fieldAnswers)).map((element: any) => { return { value: element.value, label: element.label } }), 'aw')
        //     switch (question.fieldType) {
        //         case "select":
        //             return { component: Listbox, props: { optionLabel: "label", style: "width: fit-content; margin-top: 1rem;", options: JSON.parse(JSON.stringify(options)).map((element: any) => { return { value: element.value, label: element.label } }) } };

        //         case "radio":
        //             return { component: RadioButton }

        //         // case "checkbox":
        //         //     return { component: Checkbox, props: {} }

        //         default:
        //             return {
        //                 component: 'DefaultComponent',
        //                 props: {}
        //             };
        //     }
        // }
    },
});
</script>
<style></style>
  