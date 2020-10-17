// Spring Page interface implementation
export interface Page<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean
            unsorted: boolean
            empty: boolean
        },
        offset: number
        pageSize: number
        pageNumber: number
        unpaged: boolean
        paged: boolean
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}