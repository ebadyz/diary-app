export function allDiariesQuery(db, onSuccess) {
  return db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Diaries ORDER BY Date DESC",
      [],
      (_, results) => {
        onSuccess(
          Array.from({ length: results.rows.length })
            .fill()
            .map((_, i) => results.rows.item(i))
        );
      }
    );
  });
}
