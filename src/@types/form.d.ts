declare type FormConstructor<T> = new (...args: any[]) => T;

declare type Source = { value: number | string; label: string };
declare type SpecialChange = {
  onValuesChange: (values: unknown) => void;
  initialValues?: Record<string, unknown>;
  dataSource?: Record<string, Source[]>;
};

declare type FormItems = { tab?: FormItemCollapse[] };
declare type FormItemCollapse = {
  collapseKey?: string;
  itemsLeft?: unknown[];
  itemsRight?: unknown[];
  name?: string;
  hidden?: () => boolean;
  render?: Render;
};

declare type DisabledMode = "ADD" | "EDIT";
declare type VisibleMode = "ADD" | "DETAIL" | "EDIT";
declare interface FormItemOptions {
  name: string;
  /** Access nested field value  */
  namePath?: (string | number)[];
  /** this field will be used from translate method */
  label?: string;
  className?: string;
  inputType?:
    | "input"
    | "textarea"
    | "date"
    | "select"
    | "radio"
    | "checkbox"
    | "upload"
    | "number"
    | "list"
    | "dateTime"
    | "uploadFile";
  rows?: number;
  maxLength?: number;
  source?: Source[];
  disabled?: () => boolean;
  /** It only use for input date. format: DD-MM-YYYY HM:mm */
  formatDateTime?: boolean;
  /** It only use for input number. Display value as currency */
  currency?: boolean;
  placeholder?: string;
  selectMulti?: boolean;
  hidden?: () => boolean;
  hiddenOnEmpty?: boolean;
  arg?: any;
  dataSourceAsync?: Observable<Source[]>;
  /** It only used to filter dependent field. */
  parentOf?: string;
  render?: Render;
}

type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email";
declare interface BaseRule {
  enum?: unknown[];
  len?: number;
  max?: number;
  message?: string;
  min?: number;
  pattern?: RegExp;
  required?: boolean | (() => boolean);
  type?: RuleType;
}

type Validator = (
  rule: BaseRule,
  value: unknown,
  callback: (error?: string) => void
) => Promise<void | any> | void;
interface ValidatorRule {
  message?: string;
  validator: Validator;
}

declare interface FormValidateOptions {
  rules?: (BaseRule | ((form: FormInstance) => BaseRule | ValidatorRule))[];
}

declare interface FormPositionOptions {
  /** Item will display inner collapse */
  collapse?: string;
  /** Make form item display left or right column (we're using antd row) */
  column?: "left" | "right";
  /** Position will be display at column. Greater will be on bottom */
  columnIdx?: number;
  tabIndex?: number;
}

declare interface FormDetailLinkOptions {
  path?: string;
  newTab?: boolean;
  render?: Render;
}

declare interface FormTableOptions {
  render?: Render;
}

type Render = (value: any, values?: any) => JSX.Element;

declare interface InputProps {
  name: string;
  disabled?: boolean;
  format?: string;
  placeholder?: string;
}

declare interface FormItemType
  extends FormItemOptions,
    FormValidateOptions,
    FormPositionOptions,
    FormDetailLinkOptions,
    FormTableOptions {}

declare class FormProps<T extends object = any> {
  metadata: FormConstructor<T>;
  /** Base URL to submit data. */
  baseURL: string;
  /** Used for popup */
  isPopup?: boolean;
  detailObj?: Record<string, unknown>;
  /**
   * This field is used to assign data for combobox, checkbox or radio.
   *
   * Sample data like: { sex: [{key: 1, value: 'Nam'}, {key: 2, value: 'Nữ'}] }
   */
  dataSource?: Record<string, Source[]>;
  disabled?: boolean;
  /** Form title. */
  title?: string;
  /** Component to dislay activities */
  activitiesComponent?: JSX.Element;
  deleteButton?: boolean;
  /** The cancel button will not be displayed */
  disableCancel?: boolean;
  /** Using field to make POST action instead */
  ignorePatch?: boolean;
  callbackOnSuccess?: (values?: unknown) => void;
  /** Custom function allows to update value for form */
  setValues?: (values?: unknown, changed?: unknown) => unknown;
  constructor(metadata: FormConstructor<T>, baseURL: string) {
    this.metadata = metadata;
    this.baseURL = baseURL;
  }
}
