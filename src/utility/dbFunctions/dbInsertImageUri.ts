export const dbInsertImageUri = (database: any, imageUri: string): void => {
  database.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO imageTable (imageUri) values (?)",
      [imageUri],
      (_: any, __: any) => {
        console.log(`New image record has been added to database`);
      },
      (_: any, error: any) => console.log(`dbInsertImageUri error: ${error}`)
    );
  });
};
