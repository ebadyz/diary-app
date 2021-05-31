export function updateDiaryQuery(
  db,
  { id, title, diary, date },
  onSuccess
) {
  return db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Diaries SET Title=? , Diary=? , Date=? WHERE ID=?",
      [title, diary, date, id],
      () => onSuccess()
    );
  });
}
