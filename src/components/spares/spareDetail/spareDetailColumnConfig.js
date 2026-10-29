import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const sparesDetailColumnsConfig = (header) => [
  columnHelper.accessor("name", {
    header: () => (!header ? null : "Specs"),
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("value", {
    header: () => (!header ? null : "Value"),
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];
