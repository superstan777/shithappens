export const dbGetDogInfo = async (database: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM dogInfoTable WHERE id=1",
        [],
        (_: any, resultSet: any) => {
          resolve(resultSet);
        },
        (_: any, error: any) => {
          console.log(`dbGetDogInfo error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
