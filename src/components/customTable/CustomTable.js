import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import classes from "./customTable.module.css";

export const CustomTable = ({ data, columns, header }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={classes.box}>
      <div
        className={
          data?.length > 0 ? classes.box__table : classes.box__table__empty
        }
      >
        {data && (
          <table className={classes.box__modelTable}>
            {header && (
              <thead className={classes.box__modelTable__head}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className={classes.box__modelTable__head__row}
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={classes.box__modelTable__head__row__cell}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}

            <tbody className={classes.box__modelTable__body}>
              {data?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={classes.box__modelTable__row}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={classes.box__modelTable__body__row__data}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    {/* <hr className={classes.box__modelTable__body__}/> */}
                  </tr>
                ))
              ) : (
                <tr className={classes.box__modelTable__body__row__empty}>
                  <td
                    colSpan={columns.length}
                    className={classes.box__modelTable__body__row__data__empty}
                  >
                    Specifications are currently unavailable.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
