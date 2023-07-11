<template>
    <Button label="Serxhio" style="margin-bottom: 2rem;" />
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-6" style="display: flex; flex-direction: column; gap: 2rem; ">

            <div style="width: 100%; display: flex; justify-content: center;" v-for="button in  questionType "
                :key="button.id">
                <Button :id="button.id.toString()" @click="openDrawerFunction" :label="button.type" size="large"
                    style="width: 75%;" />
            </div>
            <!-- <Button @click="openDrawerFunction" label="Text" size="large" style="width: 75%;" />
            <Button label="Select" size="large" style="width: 75%;" />
            <Button label="RadioButton" size="large" style="width: 75%;" />
            <Button label="Checkbox" size="large" style="width: 75%;" /> -->
        </div>
        <div class="col-12 md:col-6 lg:col-6"> HERE THE DIV FOR THE QUIZ EDIT AND CRETIOn</div>
    </div>

    <Drawer v-model:openDrawer="openDrawer" @handleClose="handleCloseDrawer" :title="'Question Type'"
        :actions="drawerActions">
        <form>
            SOME form here
        </form>
    </Drawer>
</template>
  
<script lang="ts">
import Button from "primevue/button"
import Drawer from "../components/Drawer.vue"
import { defineComponent } from "vue"

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Quiz",
    components: { Button, Drawer },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    data() {
        return {
            openDrawer: false,
            drawerActions: [
                { component: Button, props: { type: 'Submit', icon: "pi pi-times", label: 'Submit', severity: 'primary', onClick: this.submitForm, } },
                { component: Button, props: { label: 'Cancel', icon: "pi pi-check", severity: 'info', onClick: this.handleCloseDrawer } }
            ],
            questionType: [
                { id: 1, type: "text", },
                { id: 2, type: "select" },
                { id: 3, type: "radio" },
                { id: 4, type: "checkbox" },

            ]
        }
    },
    methods: {
        openDrawerFunction() {
            this.openDrawer = true
        },

        handleCloseDrawer() {
            this.openDrawer = false;
        },
        submitForm() {
            console.log('awdawda')
        }

    },
});
</script>
<style></style>
  