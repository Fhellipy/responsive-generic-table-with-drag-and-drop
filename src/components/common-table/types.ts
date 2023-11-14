import { UniqueIdentifier } from "@dnd-kit/core";

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
};
