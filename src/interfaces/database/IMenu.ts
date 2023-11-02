import { eRoles } from "@/assets/enums/eRoles";

export default interface IMenu {
  id: Number;
  label?: string;
  icon: string;
  to: string;
  roleId: Number;
  collapisble: boolean;
  children?: Array<IMenu>;
  menuType: eRoles;
}
