export interface FormViewOption {
    id?: number;
}

export interface EditFormViewOption extends FormViewOption {
    ddd?: string;
}

export const DefaultEditViewOption: EditFormViewOption = {};
export interface ListFormViewOption extends FormViewOption {
    ddd?: string;
}

export const DefaultListViewOption: ListFormViewOption = {};
