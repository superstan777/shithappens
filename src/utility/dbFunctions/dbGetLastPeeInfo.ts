export const dbGetLastPeeInfo = async (database: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM peeTable ORDER BY ID DESC LIMIT 1",
        [],
        (_: any, resultSet: any) => {
          const result = resultSet.rows._array[0];
          resolve(result);
        },
        (_: any, error: any) => {
          console.log(`dbGetLastPeeInfo error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
