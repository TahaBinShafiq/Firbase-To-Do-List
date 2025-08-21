import { db } from "./config.js";
import { collection, query, onSnapshot , setDoc , doc } from "./firestore-db.js";


let taskId = 0


document.querySelector("button").addEventListener("click", async () => {
    const input = document.querySelector("input").value;
    if (input.trim() !== "") {
        const docRef = await setDoc(doc(db, "task" , taskId.toString()), {
            task: input,
            createdAt: new Date().toISOString()
        });
        document.querySelector("input").value = "";
    }
    taskId++;
});


async function showAllTasks() {
    const q = query(collection(db, "task"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const task = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
    });    
}

showAllTasks()