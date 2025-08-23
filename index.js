import { db } from "./config.js";
import { collection, query, onSnapshot, addDoc, getDocs, updateDoc, doc, orderBy, deleteDoc } from "./firestore-db.js";


const input = document.querySelector("input");
const mainBtn = document.querySelector("button");
let editId = null;

mainBtn.addEventListener("click", async () => {
    if (input.value.trim() === "") {
        input.style.border = "2px solid red"
        return;
    }

    const allData = await getDocs(collection(db, "tasks"));
    // Edit Task 
    if (editId) {
        let alreadyExist = false;
        allData.forEach((doc) => {
            if (doc.data().task.toLowerCase() === input.value.toLowerCase()) {
                alreadyExist = true
                return;
            }
        })

        if (alreadyExist === true) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This value already exists",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            });
            input.style.border = "2px solid orange";
            input.value = ""
            return;

        }

        await updateDoc(doc(db, "tasks", editId), {
            task: input.value
        })
        editId = null;
        mainBtn.textContent = "Add";
        input.value = "";
        return;
    };


    let alreadyExist = false;
    allData.forEach((doc) => {
        if (doc.data().task.toLowerCase() === input.value.toLowerCase()) {
            alreadyExist = true
        }
    })

    if (alreadyExist === true) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This value already exists",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
        });
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

let list = document.getElementById("list")

if (list.scrollHeight > 500) {
    list.style.maxHeight = "300px";
    list.style.overflowY = "auto";
}

async function showAllTasks() {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const task = [];
        list.innerHTML = ""
        querySnapshot.forEach((docSnap) => {
            let { task } = docSnap.data();
            if (list) {
                list.innerHTML += `<li>
                <p class="task-title" title="Sample Task">${task}</p>
                <div class="actions">
                  <!-- Edit Button -->
                  <button class="icon-btn edit" type="button" data-id="${docSnap.id}" aria-label="Edit task" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

                    <span>Edit</span>
                  </button>
        
                  <!-- Delete Button -->
                  <button class="icon-btn delete" type="button" data-id="${docSnap.id}" aria-label="Delete task" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                    <span>Delete</span>
                  </button>
                </div>
              </li>`
            }

            document.querySelectorAll(".edit").forEach((editBtn) => {
                editBtn.onclick = (e) => {
                    let id = editBtn.getAttribute("data-id")
                    let taskElement = editBtn.closest("li").querySelector(".task-title");
                    input.value = taskElement.textContent;
                    editId = id
                    mainBtn.textContent = "Update";
                }
            });

            document.querySelectorAll(".delete").forEach((delBtn) => {
                delBtn.onclick = async () => {
                    let id = delBtn.getAttribute("data-id");
                    await deleteDoc(doc(db, "tasks", id));
                }

            })
        });
    });

}

showAllTasks()