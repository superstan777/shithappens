import { createContext } from "react";
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("dog2111111111111.db");

export const DatabaseContext = createContext<any>(database);
