// Initial students array
let students = [
    { name: "Ing Davann", grade: "A" },
  { name: "Sreng Chipor", grade: "B" },
];

let filteredStudents = [...students];

function addStudent() {
  const nameInput = document.getElementById("studentName");
  const gradeInput = document.getElementById("studentGrade");

  const name = nameInput.value.trim();
  const grade = gradeInput.value.trim().toUpperCase();

  if (name === "" || grade === "") {
    showMessage("Please fill in both name and grade fields", "error");
    return;
  }

  students.push({ name, grade });

  nameInput.value = "";
  gradeInput.value = "";


  applyCurrentFilter();


  showMessage("Student added successfully!", "success");
}

function filterStudents() {
  const gradeFilter = document
    .getElementById("gradeFilter")
    .value.trim()
    .toUpperCase();

  if (gradeFilter === "") {
    filteredStudents = [...students];
  } else {
    filteredStudents = students.filter(
      (student) => student.grade === gradeFilter
    );
  }

  displayStudents();
  updateTotalCount();
}

function resetFilter() {
  document.getElementById("gradeFilter").value = "";
  filteredStudents = [...students];
  displayStudents();
  updateTotalCount();
  showMessage("Filter reset successfully!", "success");
}

function applyCurrentFilter() {
  const gradeFilter = document
    .getElementById("gradeFilter")
    .value.trim()
    .toUpperCase();

  if (gradeFilter === "") {
    filteredStudents = [...students];
  } else {
    filteredStudents = students.filter(
      (student) => student.grade === gradeFilter
    );
  }

  displayStudents();
  updateTotalCount();
}

function displayStudents() {
  const studentsList = document.getElementById("studentsList");
  const emptyState = document.getElementById("emptyState");

  if (filteredStudents.length === 0) {
    studentsList.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");

    studentsList.innerHTML = filteredStudents
      .map(
        (student, index) => `
                    <div class="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-bold text-gray-800 text-lg">${
                                  index + 1
                                }. ${student.name}</h3>
                                <p class="text-gray-600 mt-1">Grade: <span class="font-semibold">${
                                  student.grade
                                }</span></p>
                            </div>
                            <button onclick="removeStudent(${students.indexOf(
                              student
                            )})" 
                                    class="text-red-500 hover:text-red-700 font-bold text-xl ml-4">
                                ×
                            </button>
                        </div>
                    </div>
                `
      )
      .join("");
  }
}


function removeStudent(index) {
  if (confirm("Are you sure you want to remove this student?")) {
    students.splice(index, 1);
    applyCurrentFilter();
    showMessage("Student removed successfully!", "success");
  }
}


function updateTotalCount() {
  document.getElementById("totalCount").textContent = filteredStudents.length;
}

function showMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }`;
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}


document
  .getElementById("studentName")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addStudent();
    }
  });

document
  .getElementById("studentGrade")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addStudent();
    }
  });

document
  .getElementById("gradeFilter")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      filterStudents();
    }
  });

displayStudents();
updateTotalCount();
