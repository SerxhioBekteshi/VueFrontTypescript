<template>
    <Button label="Serxhio" style="margin-bottom: 2rem;" />
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-6" style="display: flex; flex-direction: column; gap: 2rem; ">
            <div style="width: 100%; display: flex; justify-content: center;" v-for="button in  questionType "
                :key="button.id">
                <Button :id="button.id.toString()" @click="openDrawerFunction(button.type)" :label="button.type"
                    size="large" style="width: 75%;" />
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-6">
            <div v-for="(question) in quizQuestion" :key="question.id">
                <label>{{ question.questionName }}</label>

                <div v-if="question.fieldType === 'select'">
                    <div>
                        <Listbox :options="JSON.parse(JSON.stringify(question.fieldAnswers)).map((element: any) => { return { label: element.label, value: element.value } }
                        )" optionLabel="name" class="w-full md:w-14rem" />
                    </div>
                </div>


                <div v-if="question.fieldType === 'radio'" class="card flex justify-content-center">
                    <div class="flex flex-column gap-3">
                        <div class="flex align-items-center" v-for="field in question.fieldAnswers" :key="field._id">
                            <!-- {{ value }} -->
                            <RadioButton :inputId="field.value" :value="field.label" />
                            <label :for="field.value" class="ml-2">{{ field.name }}</label>
                        </div>
                    </div>
                </div>

                <div v-if="question.fieldType === 'radio'" class="card flex justify-content-center">
                    <div class="flex flex-column gap-3">
                        <div class="flex align-items-center" v-for="field in question.fieldAnswers" :key="field._id">
                            <Checkbox :inputId="field.value" :value="field.label" />
                            <label :for="field.value" class="ml-2">{{ field.name }}</label>
                        </div>
                    </div>
                </div>


                <!-- :options="question.fieldAnswers.map((element: any) => { return { value: element.value, label: element.label } })"  -->
            </div>
        </div>
    </div>

    <Drawer v-model:openDrawer="openDrawer" @handleClose="handleCloseDrawer" :title="'Question Type'"
        :actions="drawerActions">
        <form>
            <div class="flex flex-wrap  mb-3 gap-1">
                <label for="question">Determine the question</label>
                <InputText :style="{ width: '100%', borderColor: v$.question.$error ? 'red' : '' }" class="fullWidth"
                    id="question" placeholder="Question" v-model="question" />
                <ValidationError v-if="v$.question.$error" style="width: 100%; background: none;" severity="error">{{
                    v$.question.$errors[0].$message }}
                </ValidationError>
            </div>

            <div class="flex flex-wrap  mb-3 gap-1">
                <label for="questionOptions">Give the options</label>
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


export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Quiz",
    components: { Button, Drawer, ValidationError, InputText },
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
  