export const dbGetImageUri = async (database: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM imageTable WHERE id=1", // nie ma rekordu z id 1 do zrobienia
        [],
        (_: any, resultSet: any) => {
          // const result = resultSet.rows._array[0].imageUri;
          const result = resultSet.rows._array[0];
          resolve(result);
        },
        (_: any, error: any) => {
          console.log(`dbGetImageUri error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
