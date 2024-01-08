import { MenuItem, MenuItemCommandEvent } from "primevue/menuitem";

export interface INotificationItem {
  _id: any;
  id: number;
  message: any;
  route: string;
  seen: boolean;
  createdAt: Date;
  sender: any;
  user: any;
}

export interface IExtendedMenuItem extends MenuItem {
  msg?: INotificationItem;
}

interface BaseMenuItem {
  label?: string | Function;
  icon?: string;
  command?: () => void;
  url?: string;
  items?: MenuItem[];
  disabled?: boolean | Function;
  visible?: boolean | Function;
  target?: string;
  separator?: boolean;
  style?: any;
  class?: any;
  key?: string;
  [key: string]: any;
}

interface ExtendedMenuItemCommandEvent extends MenuItemCommandEvent {
  item: IExtendedMenuItem;
}
