export function createDBQuery(db) {
  return db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Diaries " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Diary TEXT, Created_At TEXT, Last_Updated_At TEXT);",
      [],
      () => {
        console.log("DB CREATED");
      }
    );
  });
}
