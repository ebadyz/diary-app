export function updateDiaryQuery(
  db,
  { id, title, diary, lastUpdateAt },
  onSuccess
) {
  return db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Diaries SET Title=? , Diary=?, Last_Updated_At=? WHERE ID=?",
      [title, diary, lastUpdateAt, id],
      () => onSuccess()
    );
  });
}
