import { db } from "./config.js";
import { collection, query, onSnapshot, addDoc, getDocs } from "./firestore-db.js";


const input = document.querySelector("input");
document.querySelector("button").addEventListener("click", async () => {
    if (input.value.trim() === "") {
        input.style.border = "2px solid red"
        return;
    }
    
    const allData = await getDocs(collection(db, "tasks"));

    let alreadyExist = false;
    allData.forEach((doc) => {
        if (doc.data().task.toLowerCase() === input.value.toLowerCase()) {
            alreadyExist = true
        }
    })

    if (alreadyExist === true) {
        alert("This value already exists ❌");
        input.style.border = "2px solid orange";
        input.value = ""
        return;
        
    }

    const docRef = await addDoc(collection(db, "tasks"), {
        task: input.value,
        createdAt: new Date().toISOString(),
       
    });
    input.value = "";

});

    async function showAllTasks() {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const task = [];
            list.innerHTML = ""
            querySnapshot.forEach((doc) => {
                let { task } = doc.data();
                console.log(doc.id)
                let list = document.getElementById("list")
                if (list) {
                    list.innerHTML += `<li>
                <p class="task-title" title="Sample Task">${task}</p>
                <div class="actions">
                  <!-- Edit Button -->
                  <button class="icon-btn edit" type="button" data-id="${doc.id}" aria-label="Edit task" title="Edit">
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