import { Column, CommonTable, Row, TableWithDragAndDrop } from "./components";
import "./styles/global.css";

type TableUsers = {
  id: number;
  email: string;
  created_at: string;
  status: string;
  action: React.ReactNode;
};

export default function App() {
  const columns: Column<TableUsers>[] = [
    {
      header: "Usuário",
      accessor: "id",
      name: "name",
      link: {
        to: "/users",
        title: "Ver usuário",
      },
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Criado em",
      accessor: "created_at",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Ações",
      accessor: "action",
    },
  ];

  const usersData = [
    {
      id: 10,
      name: "Admin",
      email: "admin@gmail.com.br",
      profile_id: 1,
      created_at: "2023-11-11 11:06:21",
      updated_at: null,
      inactivated_at: null,
    },
    {
      id: 20,
      name: "Teste",
      email: "teste@gmail.com.br",
      profile_id: 2,
      created_at: "2023-11-11 11:06:21",
      updated_at: null,
      inactivated_at: null,
    },
  ];

  const users: Row<TableUsers>[] = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    status: user.inactivated_at ? "Inativo" : "Ativo",
    action: (
      <button className="font-bold p-2 border bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-all duration-300">
        Editar
      </button>
    ),
  }));

  return (
    <article className="flex flex-col gap-4 p-4">
      <section className="border p-4 rounded">
        <h2 className="font-bold mb-2 uppercase">Tabela responsiva comum</h2>

        <CommonTable columns={columns} data={users} />
      </section>

      <section className="border p-4 rounded">
        <h2 className="font-bold mb-2 uppercase">
          Tabela responsiva com Drag and Drop
        </h2>

        <TableWithDragAndDrop
          data={users}
          columns={columns}
          itsDragAndDropTable
          handlePosition={(id, position) => console.log(id, position)}
        />
      </section>
    </article>
  );
}
