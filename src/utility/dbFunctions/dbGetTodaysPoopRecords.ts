import { formatDate } from "../formatDate";

export const dbGetTodaysPoopRecords = async (database: any): Promise<any> => {
  const today = formatDate(new Date());
  console.log(today);
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM poopTable WHERE date="${today}"`,
        [],
        (_: any, resultSet: any) => {
          const result = resultSet.rows._array;
          resolve(result);
        },
        (_: any, error: any) => {
          console.log(`dbGetTodaysPoopRecords: ${error}`);
          reject(error);
        }
      );
    });
  });
};
