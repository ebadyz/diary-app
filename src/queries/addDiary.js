export function addDiaryQuery(db, { title, diary, createdAt }, onSuccess) {
  return db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Diaries (Title, Diary, Date) VALUES (?,?,?)",
      [title, diary, createdAt],
      () => onSuccess()
    );
  });
}
