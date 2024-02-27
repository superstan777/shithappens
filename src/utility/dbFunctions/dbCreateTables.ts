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
      "CREATE TABLE IF NOT EXISTS dogInfoTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, breed TEXT, imageUri TEXT)"
    );
  });
};
