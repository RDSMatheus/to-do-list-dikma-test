import React from "react";

const TarefaEditPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return <div>{params.id}</div>;
};

export default TarefaEditPage;
