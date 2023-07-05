import React, { useState } from "react";
import {
    useListController,
    ListPaginationContext,
    useListPaginationContext,
    useListParams,
    ListContextProvider
} from "react-admin";

/** List base that does not trigger new queries on pagination changes
 * but servers pages from its memoized state. Sort, filter, order are
 * not affected.
 */
export const PageCachedListBase = ({ children, ...props }) => {
    /* We need `useListParams` here, to grab query string filter,
      pagination, etc. options since `syncWithLocation` is false.
      This prevents `useListController` to use the page props
      provided by `useListParams`.
    */
    const [listParams] = useListParams(props);
    // Get props from data provider. Pagination is disabled here.
    const controllerProps = useListController({
        ...listParams,
        ...props,
        page: undefined,
        perPage: undefined,
        syncWithLocation: false,
    });

    // Pagination defaults come from the `useListParams`.
    const [currentPage, setCurrentPage] = useState(listParams.page);
    const [perPage, setPerPage] = useState(listParams.perPage);

    const listContext = {
        ...controllerProps,
        ids: controllerProps.ids.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        ),
    };

    return (
        <ListContextProvider value={listContext}>
            <CustomPaginationContextProvider
                {...{
                    controllerProps,
                    currentPage,
                    setCurrentPage,
                    perPage,
                    setPerPage,
                }}
            >
                {children}
            </CustomPaginationContextProvider>
        </ListContextProvider>
    );
};

const CustomPaginationContextProvider = ({
    controllerProps, children, currentPage, setCurrentPage, perPage, setPerPage,
}) => {
    // Here, we intercept, to use the custom pagination.
    const customPaginationContext = {
        ...useListPaginationContext(controllerProps),
        page: currentPage,
        perPage: perPage,
        setPage: setCurrentPage,
        setPerPage: setPerPage,
    };
    return (
        <ListPaginationContext.Provider value={customPaginationContext}>
            {children}
        </ListPaginationContext.Provider>
    );
};
