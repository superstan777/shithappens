export const dbUpdateImageUri = (database: any, imageUri: string): void => {
  database.transaction((tx: any) => {
    tx.executeSql(
      "UPDATE dogInfoTable SET imageUri = (?) WHERE id = 1",
      [imageUri],
      (_: any, __: any) => {
        console.log(`Dog record has been updated successfully`);
      },
      (_: any, error: any) => {
        console.error(`dbUpdateImageUri error: ${error}`);
      }
    );
  });
};
