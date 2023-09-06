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
      <InlineMessage
        v-if="cellValue.length == 0 || cellValue == null"
        severity="warn"
      >
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
    const renderBooleanValue = (value: boolean) => {
      return value
        ? '<span><i class="pi pi-check-circle text-green-500"></i></span>'
        : '<span><i class="pi pi-times-circle text-red-400"></i></span>';
    };

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

    // const renderCellValue = (value: any, column: any) => {
    //   if (column) {
    //     //   if (value == null || value === "") {
    //     //     return "-ad";
    //     //   } else {
    //     switch (column.propertyType) {
    //       case eDataType.DateTime:
    //         return moment(value).locale("sq").format("DD/MM/YYYY");
    //       case eDataType.Decimal:
    //         return `${groupDigital(value)}`;
    //       case eDataType.Number:
    //         return value;
    //       case eDataType.Boolean:
    //         return renderBooleanValue(value);
    //       // case eDataType.Tags:
    //       //   return renderTagArrayElements(value);
    //       // case eDataType.Icons:
    //       //   return renderIcons(column.icons);
    //       // case eDataType.Custom:
    //       //   let amountValue: any = value.split(' ')[0];
    //       //   let currency: any = value.split(' ')[1];
    //       //   return `${groupDigital(amountValue)} ${currency}`;

    //       default:
    //         return value;
    //     }
    //   }
    // };

    return {
      // renderCellValue,
      groupDigital,
      moment,
      eDataType,
    };
  },
});
</script>
<style>
::v-deep .p-listbox,
.p-listbox-list {
  padding: 0 !important;
}

.image-wrapper {
  width: 75px; /* Set your desired width */
  height: 75px; /* Set your desired height */
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Preserve aspect ratio while filling the container */
}
</style>
