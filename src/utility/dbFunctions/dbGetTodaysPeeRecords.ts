import { formatDate } from "../formatDate";

export const dbGetTodaysPeeRecords = async (database: any): Promise<any> => {
  const today = formatDate(new Date());
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM peeTable WHERE date="${today}"`,
        [],
        (_: any, resultSet: any) => {
          const result = resultSet.rows._array;
          console.log(result);
          resolve(result);
        },
        (_: any, error: any) => {
          console.log(`dbGetTodaysPeeRecords: ${error}`);
          reject(error);
        }
      );
    });
  });
};
