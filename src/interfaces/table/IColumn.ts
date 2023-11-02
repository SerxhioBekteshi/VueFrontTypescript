import { eColumnType } from "@/assets/enums/eColumnType";
import ITableIcons from "./ITableIcons";

export default interface IColumn<T = {}> {
  title?: string;
  propertyName?: keyof T | string;
  propertyType: eColumnType;
  hidden?: boolean;
  filtrable?: boolean;
  unSortable?: boolean;
  icons?: ITableIcons[];
  hasExtraData?: boolean;
  style?: any;
  field: any;
}
