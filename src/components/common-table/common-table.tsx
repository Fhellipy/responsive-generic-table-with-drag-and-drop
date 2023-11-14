import { TableProps } from "./types";

export function CommonTable<R extends object>(props: TableProps<R>) {
  const { columns, data } = props;

  return (
    <table className="w-full table-fixed rounded sm:border-collapse sm:border sm:shadow">
      <thead className="absolute h-1 w-1 overflow-hidden border-none bg-secondary text-sm uppercase tracking-wider sm:relative sm:h-auto sm:w-fit">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="border p-2 text-center uppercase"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-sm text-foreground sm:bg-background">
        {!data.length && (
          <tr className="w-full text-center opacity-50">
            <td
              colSpan={columns.length}
              className="w-full rounded border px-2 py-4 font-bold text-secondary-foreground"
            >
              Nenhum registro encontrado!
            </td>
          </tr>
        )}

        {data.map((row, index) => (
          <tr
            key={index}
            className="mb-4 flex flex-col rounded border bg-secondary shadow last:mb-0 sm:mb-0 sm:table-row sm:flex-row sm:border-none sm:bg-transparent sm:shadow-none"
          >
            {columns.map((column, index) => (
              <td
                key={index}
                data-label={column.header}
                className="flex items-center justify-between gap-2 truncate border-b p-2 text-right before:float-left before:font-bold before:content-[attr(data-label)] sm:table-cell sm:border sm:text-center sm:before:content-none"
              >
                {column.link ? (
                  <a
                    className="font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:underline"
                    href={`${column.link.to}/${row[column.accessor]}`}
                    title={`${column.link.title} ${
                      column?.name
                        ? row[column.name as keyof R]
                        : row[column.accessor]
                    }`}
                  >
                    {column.name
                      ? row[column.name as keyof R]
                      : row[column.accessor]}
                  </a>
                ) : (
                  <>{row[column.accessor]}</>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
