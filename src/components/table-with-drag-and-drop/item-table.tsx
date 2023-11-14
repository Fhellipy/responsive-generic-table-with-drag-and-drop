import { useSortable, type AnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import { type ItemTable } from "./types";

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);

export function ItemTable<R extends object>(props: ItemTable<R>) {
  const { columns, row, itsDragAndDropTable } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, animateLayoutChanges });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <tr
      className="mb-4 flex flex-col rounded border bg-secondary shadow last:mb-0 sm:mb-0 sm:table-row sm:flex-row sm:border-none sm:bg-transparent sm:shadow-none"
      ref={setNodeRef}
      style={style}
    >
      {itsDragAndDropTable && (
        <td className="flex items-center justify-center gap-2 truncate border-b p-2 text-center before:float-left sm:table-cell">
          <button
            {...handleProps}
            className="flex w-full items-center justify-center rounded p-2 text-gray-500 transition-all duration-300 hover:bg-primary/50"
          >
            <GripVerticalIcon size={16} />
          </button>
        </td>
      )}

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
              {column.name ? row[column.name as keyof R] : row[column.accessor]}
            </a>
          ) : (
            <>{row[column.accessor]}</>
          )}
        </td>
      ))}
    </tr>
  );
}
