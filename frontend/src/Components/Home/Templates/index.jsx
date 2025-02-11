import React from "react";
import styles from "./index.module.css";
import products from "../../../database.json";
import UserContext from "../../../UserContext";
import { useContext } from "react";

export default function Template() {
  const { nome, loading } = useContext(UserContext);

  return (
    <>
      { 
      products.map((product) => (
        <div className={styles.template} key={product.id}>
          <a href={product.link} target="_blank">
            <img className={styles.img} src={product.img} alt="" />
          </a>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
        </div>
      ))}
    </>
  );
}
