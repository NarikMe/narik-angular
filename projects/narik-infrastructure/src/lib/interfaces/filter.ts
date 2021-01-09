/**
 * Filter items
 */
export interface FilterItems {
    /**
     * condition  `or` | `and`
     */
    condition: string;

    /**
     * filters
     */
    filters: (FilterItem | FilterItems)[];
}

/**
 * Filter item
 */
export interface FilterItem {
    /**
     * field
     */
    field?: string;

    /**
     * operator
     */
    operator?: any;

    /**
     * value
     */
    value?: any;
}
