export const dbCreateTables = (database: any): void => {
  //proper types to be done
  database.transaction((tx: any) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS peeTable (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, time TIME)"
    );
  });
  database.transaction((tx: any) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS poopTable (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, time TIME)"
    );
  });
  database.transaction((tx: any) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS imageTable (id INTEGER PRIMARY KEY AUTOINCREMENT, imageUri TEXT)"
    );
  });
};
