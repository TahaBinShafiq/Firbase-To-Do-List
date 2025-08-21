



onSnapshot(collection(db, "todos"), (snapshot) => {
  snapshot.forEach(doc => {
    console.log(doc.data());
  });
});