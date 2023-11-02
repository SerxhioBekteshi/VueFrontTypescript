import { eFilterOperator } from "@/assets/enums/eFilterOperator";

export default interface IFilter {
  columnName: string;
  value?: any;
  operation?: eFilterOperator;
  description?: string;
}
