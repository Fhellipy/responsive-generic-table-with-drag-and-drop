import { type UniqueIdentifier } from "@dnd-kit/core";

export type Column<R> = {
  header: React.ReactNode;
  name?: string;
  accessor: keyof R;
  link?: {
    to: string;
    title: string;
  };
};

export type Row<R> = Record<keyof R, React.ReactNode> & {
  id: UniqueIdentifier;
  position?: number | null;
};

export type TableProps<R> = {
  data: Row<R>[];
  columns: Column<R>[];
  itsDragAndDropTable?: boolean;
  handlePosition?: (id: number, position: number) => void;
};

export type ItemTable<R> = {
  id: UniqueIdentifier;
  row: Partial<Row<R>>;
  columns: Column<R>[];
  itsDragAndDropTable?: boolean;
};

export type ItemPositionType = {
  id?: number | null;
  position?: number | null;
};

export type Item<R> = Partial<Row<R>>[] & ItemPositionType;
