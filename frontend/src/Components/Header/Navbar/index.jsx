import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="contato">Contato</NavLink>
        </li>
        <li>
          <NavLink to="curiosidades">Curiosidades</NavLink>
        </li>
        <li>
          <NavLink to="ajuda">Ajuda</NavLink>
        </li>
      </ul>
    </>
  );
}
