export const dbGetAllPeeRecords = async (database: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM peeTable ",
        [],
        (_: any, resultSet: any) => {
          const result = resultSet.rows._array;
          resolve(result);
        },
        (_: any, error: any) => {
          console.log(`dbGetCards error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
