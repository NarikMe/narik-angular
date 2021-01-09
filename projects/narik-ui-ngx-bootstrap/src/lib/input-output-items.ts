export const NARIK_UI_COMPONENT_INPUTS: string[] = ['options'];

export const NARIK_UI_FORM_INPUTS: string[] = [
    'id',
    'name',
    'label',
    'disabled',
    'required',
    'readOnly',
    'placeHolder',
    ...NARIK_UI_COMPONENT_INPUTS,
];

export const NARIK_DATA_ORIENTED_OUTPUTS: string[] = [
    'dataChange',
    'selectedItemChange',
];

export const NARIK_DATA_ORIENTED_INPUTS: string[] = [
    'listenForDataChange',
    'dataSource',
    'dataKey',
    'dataUrl',
    'dataInfo',
    'dataProviderKey',
    'dataParameters',
    'moduleKey',
    'dataMethod',
    'dataUrlMethod',
    ...NARIK_UI_FORM_INPUTS,
];

export const NARIK_DATA_DISPLAY_VALUE_OUTPUTS: string[] = [
    ...NARIK_DATA_ORIENTED_OUTPUTS,
];

export const NARIK_DATA_DISPLAY_VALUE_INPUTS: string[] = [
    'displayField',
    'valueField',
    ...NARIK_DATA_ORIENTED_INPUTS,
];

export const NARIK_AUTOCOMPLETE_INPUTS: string[] = [
    'displayText',
    'minSearchLength',
    'isLazyLoadData',
];

export const NARIK_CHECKBOX_INPUTS: string[] = ['tag', ...NARIK_UI_FORM_INPUTS];

export const NARIK_SELECT_INPUTS: string[] = ['multiple'];

export const NARIK_DATA_TABLE_SELECT_INPUTS: string[] = [
    ...NARIK_SELECT_INPUTS,
    'gridOptions',
];

export const NARIK_DATE_PICKER_INPUTS: string[] = [...NARIK_UI_FORM_INPUTS];

export const NARIK_INPUT_INPUTS: string[] = [
    'maxlength',
    'type',
    'mask',
    'icon',
    'displayStatus',
    ...NARIK_UI_FORM_INPUTS,
];
