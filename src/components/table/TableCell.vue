<template>
  <div style="border: 0; background-color: inherit; padding: none">
    <div v-if="cellColumn.propertyType === eColumnType.DateTime">
      {{
        cellValue ? moment(cellValue).locale("sq").format("DD/MM/YYYY") : "-"
      }}
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Decimal">
      {{ groupDigital(cellValue) }}
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Number">
      {{ cellValue }}
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Status">
      <Tag :value="cellValue" :severity="getSeverity(cellValue)"></Tag>
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Boolean">
      <InputSwitch :modelValue="cellValue" disabled />
      <!-- <span>
        <i
          :class="{
            'pi pi-check-circle text-green-500': cellValue,
            'pi pi-times-circle text-red-400': !cellValue,
          }"
        ></i>
      </span> -->
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Image">
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
    <div v-else-if="cellColumn.propertyType === eColumnType.Icons">
      <TableCellActions
        @edit-clicked="handleEditClick"
        :fieldToShowOnModalDelete="fieldToShowOnModalDelete"
        @delete-clicked="handleDeleteClick"
        @custom-row-bt-clicked="handleCustomRowBtClick"
        :columnIcons="cellValue"
        :additionalData="additionalData"
      />
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Link">
      <a :href="cellValue" target="_blank" rel="noopener noreferrer"
        >Paypal Link</a
      >
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Object">
      <!-- <ScrollPanel v-tooltip="'Double click for more'" style="height: 50px"> -->
      <div
        class="cursor-pointer"
        @dblclick="
          () => {
            $emit('on-cell-double-click', cellValue, eColumnType.Object);
          }
        "
      >
        <Tag value="Double click for more" severity="warning" />
        <!-- <ul>
            <li v-for="(value, key) in cellValue" :key="key">
              {{ key }}:
              <CellNestedObject :nestedObject="value" />
            </li>
          </ul> -->
      </div>
      <!-- </ScrollPanel> -->
    </div>
    <div v-else-if="cellColumn.propertyType === eColumnType.Array">
      <!-- <ScrollPanel v-tooltip="'Double click for more'" style="height: 50px"> -->
      <div
        class="cursor-pointer"
        @dblclick="
          () => {
            $emit('on-cell-double-click', cellValue, eColumnType.Array);
          }
        "
      >
        <Tag value="Double click for more" severity="warning" />

        <!-- <ul v-tooltip v-for="(obj, index) in cellValue" :key="index">
          <li v-for="(value, key) in obj" :key="key">
            {{ key }}:
          <CellNestedObject :nestedObject="value" /> 
          </li>
        </ul> -->
      </div>
      <!-- </ScrollPanel> -->
    </div>

    <div v-else>
      {{ cellValue ? cellValue : "-" }}
    </div>
  </div>
</template>

<script lang="ts">
import eColumnType from "@/assets/enums/eColumnType";
import IColumn from "@/interfaces/table/IColumn";
import { groupDigital } from "@/utils/functions";
import moment from "moment";
import { PropType, defineComponent } from "vue";
import InlineMessage from "primevue/inlinemessage";
import Tag from "primevue/tag";
import { eOrderStatus } from "@/assets/enums/eOrderStatusType";
// import CellNestedObject from "./CellNestedObject.vue";
// import ScrollPanel from "primevue/scrollpanel";
import TableCellActions from "./TableCellActions.vue";
import InputSwitch from "primevue/inputswitch";

export default defineComponent({
  name: "TableCell",
  components: {
    InlineMessage,
    Tag,
    // CellNestedObject,
    // ScrollPanel,
    TableCellActions,
    InputSwitch,
  },
  emits: [
    "on-cell-double-click",
    "edit-clicked",
    "custom-row-bt-clicked",
    "delete-clicked",
  ],
  props: {
    cellValue: {
      type: null,
    },
    cellColumn: {
      type: Object as PropType<IColumn>,
      required: true,
    },
    additionalData: {
      type: null,
    },
    fieldToShowOnModalDelete: {
      type: String,
    },
  },
  enums: {
    eColumnType,
  },
  setup(props, { emit }) {
    const isObject = (value: any) => {
      return typeof value === "object" && value !== null;
    };

    const getSeverity = (value: any) => {
      switch (value) {
        case eOrderStatus.Completed:
          return "success";

        case eOrderStatus.Pending:
          return "warning";

        case eOrderStatus.Rejected:
          return "danger";

        default:
          return "";
      }
    };

    const handleEditClick = (data: any, rowId: number) => {
      emit("edit-clicked", data, rowId);
    };

    const handleCustomRowBtClick = (rowId: number) => {
      emit("custom-row-bt-clicked", rowId);
    };

    const handleDeleteClick = (field: any, rowId: number) => {
      emit("delete-clicked", field, rowId);
    };

    return {
      getSeverity,
      groupDigital,
      isObject,
      handleEditClick,
      handleCustomRowBtClick,
      handleDeleteClick,
      moment,
      eColumnType,
    };
  },
});
</script>
<style scoped>
::v-deep(.p-listbox) {
  padding: 0;
}

.truncate-cell-content {
  max-width: 150px; /* Set your desired max-width */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  object-fit: cover;
}
</style>
