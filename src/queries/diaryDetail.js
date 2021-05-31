export function diaryDetailQuery(db, { id }, onSuccess) {
  return db.transaction((tx) => {
    tx.executeSql("SELECT * FROM Diaries WHERE ID=?", [id], (_, results) => {
      onSuccess(results.rows.item(0));
    });
  });
}
