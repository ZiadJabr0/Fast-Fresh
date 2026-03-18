// shopping.js
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

function saveList() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function updateEmptyState() {
    const empty = document.getElementById("emptyState");
    if (!empty) return;

    empty.style.display = shoppingList.length ? "none" : "block";
}

function renderList() {
    const listEl = document.getElementById("shoppingList");
    if (!listEl) return;

    listEl.innerHTML = "";

    shoppingList.forEach((item, index) => {
        const li = document.createElement("li");

        // FORCE: If it's an old object, take the name. If it's a string, take the string.
        // We specifically DO NOT include any (x${item.qty}) here.
        const displayName = typeof item === 'object' ? item.name : item;
        li.textContent = displayName;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = () => {
            shoppingList.splice(index, 1);
            saveList();
            renderList();
        };

        li.appendChild(removeBtn);
        listEl.appendChild(li);
    });

    if (typeof updateEmptyState === "function") updateEmptyState();
}

function addItem() {
    const nameInput = document.getElementById("itemInput");
    const name = nameInput.value.trim();

    if (!name) return;

    // We only push the string now, no object, no quantity.
    shoppingList.push(name);

    saveList();
    renderList();

    nameInput.value = "";
    nameInput.focus();
}

function removeItem(index) {
    shoppingList.splice(index, 1);
    saveList();
    renderList();
}

function clearList() {
    shoppingList = [];
    saveList();
    renderList();
}


document.addEventListener("DOMContentLoaded", renderList);