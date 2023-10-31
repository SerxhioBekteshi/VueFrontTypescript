import { eFilterOperator } from "./eFilterOperator";

export default interface IFilter {
  columnName: string;
  value?: any;
  operation?: eFilterOperator;
  description?: string;
}
