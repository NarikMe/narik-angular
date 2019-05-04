export interface FormViewOption {
  id?: number;
}

export interface DetailFormViewOption extends FormViewOption {
  ddd?: string;
}

export const DefaultDetailViewOption: DetailFormViewOption = {};
export interface ListFormViewOption extends FormViewOption {
  ddd?: string;
}

export const DefaultListViewOption: ListFormViewOption = {};
