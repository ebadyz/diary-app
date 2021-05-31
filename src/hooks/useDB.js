import { useContext } from "react";
import { DBContext } from "../contexts/db";

export function useDB() {
  const db = useContext(DBContext);
  return db;
}
