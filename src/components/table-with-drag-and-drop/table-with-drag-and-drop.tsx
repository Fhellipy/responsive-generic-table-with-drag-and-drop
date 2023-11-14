import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { swapPositions, type ArrType } from "../../utils";
import { ItemTable } from "./item-table";
import { TableProps, type Item, type Row } from "./types";

export function TableWithDragAndDrop<R extends object>(props: TableProps<R>) {
  const { columns, data, itsDragAndDropTable, handlePosition } = props;

  const [activeItem, setActiveItem] = useState<Partial<Row<R>>>();

  const [items, setItems] = useState<Item<R>>(data);
  const [sortableIds] = useState(
    items.map((item) => item.id as UniqueIdentifier)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      const newItems = items as ArrType<Item<R>>[];

      const itemsCopy = swapPositions(
        newItems,
        active.id,
        over.id,
        (id, position) => {
          handlePosition && handlePosition(id, position as number);
        }
      ) as Item<R>;

      setItems([...itemsCopy]);
    }
  }

  function handleDragStart({ active: { id } }: DragStartEvent) {
    const item = items.find((item) => item.id === id);

    setActiveItem(item);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <table className="w-full table-fixed rounded sm:border-collapse sm:border sm:shadow">
        <thead className="absolute h-1 w-1 overflow-hidden border-none bg-secondary text-sm uppercase tracking-wider sm:relative sm:h-auto sm:w-fit">
          <tr>
            {itsDragAndDropTable && (
              <th scope="col" className="border p-2"></th>
            )}

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
          {!items.length && (
            <tr className="w-full text-center opacity-50">
              <td
                colSpan={columns.length}
                className="w-full rounded border px-2 py-4 font-bold text-secondary-foreground"
              >
                Nenhum registro encontrado!
              </td>
            </tr>
          )}

          <SortableContext
            items={sortableIds}
            strategy={verticalListSortingStrategy}
          >
            {items.map((row) => (
              <ItemTable
                row={row}
                key={row.id}
                columns={columns}
                id={row.id as UniqueIdentifier}
                itsDragAndDropTable={Boolean(
                  itsDragAndDropTable && handlePosition
                )}
              />
            ))}
          </SortableContext>
        </tbody>
      </table>

      {itsDragAndDropTable &&
        createPortal(
          <DragOverlay>
            {activeItem && (
              <table className="w-full table-fixed rounded sm:border-collapse sm:border sm:shadow">
                <tbody className="text-sm text-foreground sm:bg-background">
                  <ItemTable
                    row={activeItem}
                    columns={columns}
                    id={activeItem.id as UniqueIdentifier}
                    itsDragAndDropTable={Boolean(
                      itsDragAndDropTable && handlePosition
                    )}
                  />
                </tbody>
              </table>
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
