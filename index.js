import { db } from "./config.js";
import { collection, query, onSnapshot, setDoc, doc } from "./firestore-db.js";


let taskId = 0


document.querySelector("button").addEventListener("click", async () => {
    const input = document.querySelector("input").value;
    if (input.trim() !== "") {
        const docRef = await setDoc(doc(db, "tasks", taskId.toString()), {
            task: input,
            createdAt: new Date().toISOString()
        });
        document.querySelector("input").value = "";
    }
    taskId++;
});


async function showAllTasks() {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const task = [];
        list.innerHTML = ""
        querySnapshot.forEach((doc) => {
            let { task } = doc.data();
            let list = document.getElementById("list")
            if(list){
                list.innerHTML += `<li>
                <p class="task-title" title="Sample Task">${task}</p>
                <div class="actions">
                  <!-- Edit Button -->
                  <button class="icon-btn edit" type="button" aria-label="Edit task" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      aria-hidden="true">
                      <path d="M15.232 5.232a2.5 2.5 0 1 1 3.536 3.536L8.75 18.786 4 20l1.214-4.75 10.018-10.018z" />
                    </svg>
                    <span>Edit</span>
                  </button>
        
                  <!-- Delete Button -->
                  <button class="icon-btn delete" type="button" aria-label="Delete task" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      aria-hidden="true">
                      <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10z" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </li>`
            }
            
        });
    });
}

showAllTasks()