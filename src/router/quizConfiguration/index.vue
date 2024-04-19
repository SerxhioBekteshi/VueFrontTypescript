<template>
  <div class="grid">
    <div
      class="col-12 sm:col-4 md:col-4"
      style="display: flex; justify-content: center"
      v-for="(button, index) in questionType"
      :key="button.id"
    >
      <Button
        :id="`label_${index}`"
        @click="handleAddClick(button.type)"
        :label="button.type"
        style="width: 100%"
      />
    </div>
  </div>
  <div>
    <Button
      style="margin-block: 1rem"
      :disabled="!dragging"
      severity="info"
      :label="'Submit new order '"
    />
  </div>

  <div
    v-if="isLoading"
    class="flex justify-content-center align-items-center"
    style="height: 60vh"
  >
    <ProgressSpinner />
  </div>
  <div v-else>
    <draggable
      :list="quizQuestion"
      item-key="question"
      class="list-group"
      ghost-class="ghost"
      @end="dragging = true"
      @change="handleOrderChange"
    >
      <template #item="{ element, index }">
        <div class="list-group-item">
          <Panel
            :header="element.order + ' ' + element.question"
            class="mb-2"
            toggleable
          >
            <template #icons>
              <button
                class="p-panel-header-icon p-link mr-2"
                :id="`overlay_menu_${index}`"
                @click="toggleMenuPopup(index, $event, element)"
              >
                <span class="pi pi-cog"></span>
              </button>
              {{ index }}
              <Menu
                ref="menuRef"
                :id="`overlay_menu_${index}`"
                :model="menuItems"
                :popup="true"
              />
            </template>
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              "
            >
              <div v-if="element.questionType === 'select'">
                <SelectButton
                  :options="element.questionOptions"
                  optionLabel="label"
                  multiple
                  aria-labelledby="multiple"
                />
              </div>
              <div
                v-for="(option, index) in element.questionOptions"
                :key="index"
              >
                <div
                  v-if="element.questionType === 'radio'"
                  style="
                    display: flex;
                    align-items: center;
                    padding-inline: 1rem;
                  "
                >
                  <RadioButton
                    class="p-invalid"
                    :inputId="index.toString()"
                    name="option"
                  />
                  <label :for="index.toString()" class="ml-2">{{
                    option.label
                  }}</label>
                </div>

                <div
                  v-if="element.questionType === 'checkbox'"
                  style="
                    display: flex;
                    align-items: center;
                    padding-inline: 1rem;
                  "
                >
                  <Checkbox
                    class="p-invalid"
                    :inputId="index.toString()"
                    name="option"
                  />
                  <label :for="index.toString()" class="ml-2">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </template>
    </draggable>
  </div>

  <!-- <div v-for="(question, i) in quizQuestion" :key="question.id">
      <Panel
        :header="question.order + ' ' + question.question"
        class="mb-2"
        toggleable
      >
        <template #icons>
          <button
            class="p-panel-header-icon p-link mr-2"
            :id="`overlay_menu_${i}`"
            @click="toggleMenuPopup(i, $event, question)"
          >
            <span class="pi pi-cog"></span>
          </button>
          {{ i }}
          <Menu
            ref="menuRef"
            :id="`overlay_menu_${i}`"
            :model="menuItems"
            :popup="true"
          />
        </template>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          "
        >
          <div v-if="question.questionType === 'select'">
            <SelectButton
              :options="question.questionOptions"
              optionLabel="label"
              multiple
              aria-labelledby="multiple"
            />
          </div>
          <div v-for="(option, index) in question.questionOptions" :key="index">
            <div
              v-if="question.questionType === 'radio'"
              style="display: flex; align-items: center; padding-inline: 1rem"
            >
              <RadioButton
                class="p-invalid"
                :inputId="index.toString()"
                name="option"
              />
              <label :for="index.toString()" class="ml-2">{{
                option.label
              }}</label>
            </div>
  
            <div
              v-if="question.questionType === 'checkbox'"
              style="display: flex; align-items: center; padding-inline: 1rem"
            >
              <Checkbox
                class="p-invalid"
                :inputId="index.toString()"
                name="option"
              />
              <label :for="index.toString()" class="ml-2">{{
                option.label
              }}</label>
            </div>
          </div>
        </div>
      </Panel>
  
      <div
        class="mb-3 mt-3 flex quizContent"
        style="width: 100%S"
        v-if="question.fieldType === 'select'"
      >
        <div>
          <Listbox
            style="width: 100%"
            :options="JSON.parse(JSON.stringify(question.fieldAnswers)).map((element: any) => { return { label: element.label, value: element.value } }
                  )"
            optionLabel="label"
            class="w-full md:w-14rem"
          />
        </div>
      </div>
  
      <div
        v-if="question.fieldType === 'radio'"
        style="display: flex"
        class="mb-3 mt-3 flex"
      >
        <div class="flex gap-5">
          <div
            class="flex align-items-center"
            v-for="field in question.fieldAnswers"
            :key="field._id"
          >
            <RadioButton :inputId="field.value" :value="field.value" />
            <label :for="field.value" class="ml-2">{{ field.label }}</label>
          </div>
        </div>
      </div>
  
      <div v-if="question.fieldType === 'checkbox'">
        <div class="flex gap-3">
          <div
            class="flex align-items-center"
            v-for="field in question.fieldAnswers"
            :key="field._id"
          >
            <Checkbox :inputId="field.value" :value="field.label" />
            <label :for="field.value" class="ml-2">{{ field.label }}</label>
          </div>
        </div>
      </div>
    </div> -->

  <div v-if="formData || modeDrawer">
    <DetailDrawer
      :onClose="invalidateState"
      :modeDrawer="modeDrawer"
      :formData="formData"
      :controller="'quiz'"
      :validationSchema="questionValidationSchema"
      :fetchDataAfterSubmit="getQuiz"
      :additionalDataToSubmit="typeOfQuestionToSubmit"
    >
      <QuizForm />
    </DetailDrawer>
  </div>
  <Toast />
</template>

<script lang="ts">
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import DetailDrawer from "../../components/DetailDrawer.vue";
import { defineComponent, onMounted, ref, shallowRef } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import axios from "axios";
import Panel from "primevue/panel";
import Menu from "primevue/menu";
import { eFormMode } from "@/assets/enums/EFormMode";
import QuizForm from "../../components/formController/QuizForm.vue";
import SelectButton from "primevue/selectbutton";
import draggable from "vuedraggable";
import { questionValidationSchema } from "@/utils/validationSchemas";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "QuizConfiguration",
  components: {
    Button,
    DetailDrawer,
    RadioButton,
    Checkbox,
    Menu,
    QuizForm,
    Panel,
    Toast,
    SelectButton,
    draggable,
    ProgressSpinner,
  },
  props: {},
  // enums: {
  //   eFormMode
  // },
  setup() {
    const toast = useToast();
    const dragging = ref<boolean>(false);
    const invalidateState = () => {
      modeDrawer.value = null;
      formData.value = null;
    };
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const typeOfQuestionToSubmit = ref<any>({ questionType: "" });
    const quizQuestion = ref<any[]>([]);
    const questionType = shallowRef<any[]>([
      { id: 1, type: "select" },
      { id: 2, type: "radio" },
      { id: 3, type: "checkbox" },
    ]);
    const menuRef = ref();
    const isLoading = ref<boolean>(false);
    const menuItem = ref<any>(null);

    const onDragEnd = (event: any) => {
      console.log("Drag ended. New item order:", quizQuestion.value);
    };

    const handleRemoveQuestionQuiz = async () => {
      try {
        const res: any = await axios.delete(`/quiz/${menuItem.value.id}`);
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          getQuiz();
        }
      } catch (err) {
        console.log(err, "errererer");
      }
    };

    const updateQuestion = async () => {
      formData.value = menuItem.value;
    };

    const menuItems = ref([
      {
        label: "Actions",
        items: [
          {
            label: "Edit",
            icon: "pi pi-refresh",
            class: "edit-color",
            command: () => {
              updateQuestion();
            },
          },
          {
            label: "Delete",
            icon: "pi pi-times",
            command: () => {
              handleRemoveQuestionQuiz();
            },
          },
        ],
      },
    ]);

    const getQuiz = async () => {
      try {
        isLoading.value = true;
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          quizQuestion.value = res.data;
        }
        isLoading.value = false;
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    onMounted(() => {
      getQuiz();
    });

    const handleAddClick = (inputType: string) => {
      typeOfQuestionToSubmit.value.questionType = inputType;
      modeDrawer.value = eFormMode.Add;
    };

    const toggleMenuPopup = (index: number, event: MouseEvent, data: any) => {
      menuItem.value = data;
      // menu.value.toggle(menuId);
      if (menuRef.value) menuRef.value.toggle(event);
    };

    const handleOrderChange = (newOrder: any) => {
      console.log(newOrder);
      // const updatedElement = quizQuestion.value.find(
      //   (question) => question.id === newOrder.moved.element.id
      // );

      // if (updatedElement) {
      //   updatedElement.order = newOrder.moved.newIndex;
      //   console.log(updatedElement);
      // }
    };

    return {
      dragging,
      modeDrawer,
      formData,
      questionValidationSchema,
      typeOfQuestionToSubmit,
      quizQuestion,
      questionType,
      menuItems,
      menuRef,
      // eFormMode,
      isLoading,
      invalidateState,
      getQuiz,
      toggleMenuPopup,
      handleAddClick,
      onDragEnd,
      handleOrderChange,
    };
  },
});
</script>
<style scoped>
.edit-color {
  color: red !important;
}
</style>
