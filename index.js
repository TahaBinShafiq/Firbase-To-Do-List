import { db } from "./config.js";
import { collection, query, where, onSnapshot, ref } from "./firestore.js";



const todoRef = ref(db, "todos");

document.querySelector("button").addEventListener("click", () => {
    const task = document.querySelector("input").value;
    if (task.trim() !== "") {
        push(todoRef, {
            task: task,
            createdAt: Date.now()   // 👈 local timestamp
        });
        document.querySelector("input").value = "";
    }
});

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
});