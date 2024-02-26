import { formatDate } from "../formatDate";
import { formatTime } from "../formatTime";

export const dbInsertPee = (database: any): void => {
  const formatedDate = formatDate(new Date());
  const formatedTime = formatTime(new Date());
  database.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO peeTable (date,time) values (?,?)",
      [formatedDate, formatedTime],
      (_: any, __: any) => {
        console.log(`New pee record has been added to database`);
      },
      (_: any, error: any) => console.log(`dbInsertPee error: ${error}`)
    );
  });
};
