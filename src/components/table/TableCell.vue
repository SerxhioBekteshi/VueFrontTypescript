<template>
  <div
    style="border: 0; background-color: inherit; padding: none"
    v-html="renderCellValue(cellValue, cellColumn)"
  ></div>
  <div style="display: flex; justify-content: space-between; gap: ">
    <div v-for="(icon, index) in cellColumn.icons" :key="index">
      <Button
        @click="handleIconClick(icon)"
        :severity="icon.color"
        :icon="icon.name"
        rounded
        text
        size="small"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { eColumnType } from "@/assets/enums/eColumnType";
import eDataType from "@/assets/enums/eDataType";
import IColumn from "@/interfaces/IColumn";
import { groupDigital } from "@/utils/functions";
import moment from "moment";
import { PropType, defineComponent, h } from "vue";
import Button from "primevue/button";

export default defineComponent({
  name: "TableCell",
  components: { Button },
  props: {
    cellValue: {
      type: null,
    },
    cellColumn: {
      type: Object as PropType<IColumn>,
      required: true,
    },
    showEdit: Boolean,
    showDelete: Boolean,
  },
  setup(props) {
    const renderBooleanValue = (value: boolean) => {
      return value
        ? '<span><i class="pi pi-check-circle text-green-500"></i></span>'
        : '<span><i class="pi pi-times-circle text-red-400"></i></span>';
    };

    const renderIcons = (icons: any) => {
      return h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "3" } },
        icons.map((icon: any) => {
          return h(Button, {
            onClick: () => console.log("aa"),
            severity: icon.color,
            icon: icon.icon,
            text: true,
            raised: true,
            rounded: true,
          });
        })
      );
    };

    const renderCellValue = (value: any, column: any) => {
      if (column) {
        //   if (value == null || value === "") {
        //     return "-ad";
        //   } else {
        switch (column.propertyType) {
          case eDataType.DateTime:
            return moment(value).locale("sq").format("DD/MM/YYYY");
          case eDataType.Decimal:
            return `${groupDigital(value)}`;
          case eDataType.Number:
            return value;
          case eDataType.Boolean:
            return renderBooleanValue(value);
          // case eDataType.Icons:
          //   return renderIcons(column.icons);
          // case eDataType.Custom:
          //   let amountValue: any = value.split(' ')[0];
          //   let currency: any = value.split(' ')[1];
          //   return `${groupDigital(amountValue)} ${currency}`;

          default:
            return value;
        }
      }
    };

    const handleIconClick = (icon: any) => {
      switch (icon.icon) {
        case "edit":
          console.log("edit clicked");
          break;
        case "delete":
          console.log("delete clicked");
          break;
      }
    };

    return {
      renderCellValue,
      renderIcons,
      handleIconClick,
    };
  },
});
</script>
<style></style>
