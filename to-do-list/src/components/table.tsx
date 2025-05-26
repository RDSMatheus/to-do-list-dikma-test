import { TarefaStatus } from "@/service/api";
import { TarefaResponse } from "@/types/tarefa-response";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const TableComponent = ({ tarefas }: { tarefas: TarefaResponse[] }) => {
  const tarefaStatus = {
    [TarefaStatus.done]: "bg-green-400",
    [TarefaStatus.inProgress]: "bg-amber-400",
    [TarefaStatus.pending]: "bg-red-400",
  };
  console.log(tarefas);
  return (
    <div className="overflow-x-auto container mx-auto p-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Titulo</TableHeadCell>

            <TableHeadCell>Status</TableHeadCell>

            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {tarefas.map((tarefa) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {tarefa.titulo}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <span
                  className={`${
                    tarefaStatus[tarefa.status as TarefaStatus]
                  } relative h-2 w-2 rounded-full`}
                >
                  <span
                    className={`${
                      tarefaStatus[tarefa.status as TarefaStatus]
                    } absolute h-2 w-2 rounded-full blur-sm animate-pulse`}
                  ></span>
                </span>
                {tarefa.status}
              </TableCell>

              <TableCell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;

//  <TableCell>
//                 {tarefa.dataConclusao
//                   ? new Date(tarefa.dataConclusao).toLocaleDateString()
//                   : "Tarefa não conluída"}
//               </TableCell>
