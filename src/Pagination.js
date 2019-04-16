import React from "react";
import { TableFooter, TableRow, TablePagination } from "@material-ui/core";

const Pagination = props => {
  const {
    page,
    rowsPerPage,
    pageCount,
    isLoading,
    onChangePage,
    onChangeRowsPerPage
  } = props;
  console.log(page, rowsPerPage);
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          colSpan={4}
          count={isLoading ? 0 : pageCount}
          rowsPerPage={isLoading ? 0 : rowsPerPage}
          page={page}
          SelectProps={{
            native: true
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

export default Pagination;
