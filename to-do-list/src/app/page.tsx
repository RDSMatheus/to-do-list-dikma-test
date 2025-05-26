import tarefasGet from "@/action/tarefas-get";
import TableComponent from "@/components/table";
import Image from "next/image";

export default async function Home() {
  const data = await tarefasGet();
  console.log(data);
  return (
    <section>
      <TableComponent tarefas={data} />
    </section>
  );
}
