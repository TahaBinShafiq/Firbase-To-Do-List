import { db } from "./config.js";
import { collection, query, onSnapshot , setDoc , doc } from "./firestore-db.js";


let taskId = 0


document.querySelector("button").addEventListener("click", async () => {
    const task = document.querySelector("input").value;
    if (task.trim() !== "") {
        const docRef = await setDoc(doc(db, "task" , taskId.toString()), {
            task: task,
            createdAt: new Date().toISOString()
        });
        document.querySelector("input").value = "";
    }
    taskId++;
});


async function showAllTasks() {
    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const cities = [];
    //     querySnapshot.forEach((doc) => {
    //         cities.push(doc.data().name);
    //     });
    //     console.log("Current cities in CA: ", cities.join(", "));
    // });    
}