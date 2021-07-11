declare type ModalProps = {
  content?: ReactNode;
  title?: string;
  className?: string;
};

declare interface LanguageCulture {
  code: string;
  culture: string;
  key: string;
  show: boolean;
  image: any;
}

declare interface BreadCrumResponse {
  hasDetail?: boolean;
  breadcrums?: MenuPath[];
  pathName: string;
  addPage?: boolean;
}

declare interface MenuPath {
  code: string;
  title: string;
  path: string;
  showPath?: boolean;
  showMenu?: boolean;
  role?: string[];
  parent?: string[];
  icon?: any;
  isAlway?: boolean;
  hasDetail?: boolean;
  children?: MenuPath[];
}

declare interface Status {
  id: number;
  type: number;
  name: string;
}

declare global {
  interface ImportMeta {
    env: any;
  }
}

declare interface ImportMeta {
  env: any;
}

declare interface UserType {
  id: number;
  code: string;
  die: boolean;
  vote: boolean;
  name: string;
  gameCode: string;
  role: RoleType;
}
declare interface GameType {
  gameCode: string | number;
  turn: number;
  user: UserType[];
}

declare interface RoleType {
  code: string;
  name: string;
  note: string;
}
