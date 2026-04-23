let customers = JSON.parse(localStorage.getItem("customers")) || [];
let editIndex = -1;

function saveToLocalStorage() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

function addCustomer() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let status = document.getElementById("status").value; // NEW

    if (name === "" || email === "" || phone === "") {
        alert("All fields are required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter a valid email!");
        return;
    }

    let customer = { name, email, phone, status }; // UPDATED

    if (editIndex === -1) {
        customers.push(customer);
    } else {
        customers[editIndex] = customer;
        editIndex = -1;
    }

    saveToLocalStorage();
    clearForm();
    displayCustomers();
}

function displayCustomers() {
    let list = document.getElementById("customerList");
    list.innerHTML = "";

    customers.forEach((c, index) => {
        list.innerHTML += `
        <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.status}</td> <!-- NEW -->
            <td>
                <button class="edit" onclick="editCustomer(${index})">Edit</button>
                <button class="delete" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("count").innerText = customers.length;
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    saveToLocalStorage();
    displayCustomers();
}

function editCustomer(index) {
    let c = customers[index];

    document.getElementById("name").value = c.name;
    document.getElementById("email").value = c.email;
    document.getElementById("phone").value = c.phone;
    document.getElementById("status").value = c.status; // NEW

    editIndex = index;
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("status").value = "Lead"; // RESET
}

function searchCustomer() {
    let search = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#customerList tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(search) ? "" : "none";
    });
}

displayCustomers();