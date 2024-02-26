export const dbUpdateImageUri = (database: any, imageUri: string): void => {
  database.transaction((tx: any) => {
    tx.executeSql(
      "UPDATE imageTable SET imageUri = (?) WHERE id = 1",
      [imageUri],
      (_: any, __: any) => {
        console.log(`Image records has been updated successfully`);
      },
      (_: any, error: any) => {
        console.error(`dbInsertStreak error: ${error}`);
      }
    );
  });
};
