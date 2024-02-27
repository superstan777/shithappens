export const dbInsertDogInfoRecord = (
  database: any,
  name: string,
  breed: string,
  imageUri: string
): void => {
  database.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO dogInfoTable (name,breed, imageUri) values (?,?,?)",
      [name, breed, imageUri],
      (_: any, __: any) => {
        console.log(`New dog record has been added to database`);
      },
      (_: any, error: any) =>
        console.log(`dbInsertDogInfoRecord error: ${error}`)
    );
  });
};
