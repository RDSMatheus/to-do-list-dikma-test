"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { IoCreate } from "react-icons/io5";

const SideBarComponent = () => {
  return (
    <Sidebar aria-label="Barra lateral" className="m-4">
      <SidebarLogo href="#" img="/logo.png" imgAlt="To-do-list logo">
        To-do-List
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={IoCreate}>
            Criar Tarefa
          </SidebarItem>
          <SidebarItem href="#" icon={CiEdit}>
            Edição de Tarefa
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default SideBarComponent;
