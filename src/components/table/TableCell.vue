<template>
  <div style="border: 0; background-color: inherit; padding: none">
    <div v-if="cellColumn.propertyType === eDataType.DateTime">
      {{ moment(cellValue).locale("sq").format("DD/MM/YYYY") }}
    </div>
    <div v-else-if="cellColumn.propertyType === eDataType.Decimal">
      {{ groupDigital(cellValue) }}
    </div>
    <div v-else-if="cellColumn.propertyType === eDataType.Number">
      {{ cellValue }}
    </div>
    <div v-else-if="cellColumn.propertyType === eDataType.Boolean">
      <div v-if="cellValue">
        <span><i class="pi pi-check-circle text-green-500"></i></span>
      </div>
      <div v-else>
        <span><i class="pi pi-times-circle text-red-400"></i></span>
      </div>
    </div>
    <div v-else-if="cellColumn.propertyType === eDataType.Image">
      <div v-if="cellValue" class="image-wrapper">
        <img
          class="image-content"
          :src="`http://localhost:1112/${cellValue}`"
        />
      </div>
      <div v-else>
        <InlineMessage severity="warn"> No image </InlineMessage>
      </div>
    </div>
    <div v-else-if="cellColumn.propertyType === eDataType.Tags">
      <Listbox
        v-if="cellValue && cellValue.length !== 0"
        :options="cellValue"
        optionLabel="name"
        class="w-full md:w-14rem"
        listStyle="max-height:250px"
      >
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div class="flex flex-column">
              <div>
                <span style="font-weight: bold"> Ingredient: </span>
                {{ slotProps.option.name }}
              </div>
              <div>
                <span style="font-weight: bold"> Portion: </span>
                {{ slotProps.option.portion }}
              </div>
            </div>
          </div>
        </template>
      </Listbox>
      <InlineMessage v-if="!cellValue" severity="error">
        No data
      </InlineMessage>
    </div>
    <div v-else>
      {{ cellValue }}
    </div>
  </div>
</template>
// v-html="renderCellValue(cellValue, cellColumn)"

<script lang="ts">
// import eDataType from "@/assets/enums/eDataType";
import IColumn from "@/interfaces/IColumn";
import { groupDigital } from "@/utils/functions";
import moment from "moment";
import { PropType, defineComponent, h, ref } from "vue";
import Listbox from "primevue/listbox";
import InlineMessage from "primevue/inlinemessage";

export default defineComponent({
  name: "TableCell",
  components: { Listbox, InlineMessage },
  props: {
    cellValue: {
      type: null,
    },
    cellColumn: {
      type: Object as PropType<IColumn>,
      required: true,
    },
  },
  setup() {
    const eDataType = {
      Number: 0,
      String: 1,
      DateTime: 2,
      Decimal: 3,
      Boolean: 4,
      Icons: 5,
      Link: 6,
      DateOnly: 7,
      Actions: 8,
      Select: 9,
      Tags: 10,
      Image: 11,
    };

    return {
      groupDigital,
      moment,
      eDataType,
    };
  },
});
</script>
<style scoped>
::v-deep(.p-listbox) {
  padding: 0;
}

.image-wrapper {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Preserve aspect ratio while filling the container */
}
</style>
