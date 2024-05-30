document.addEventListener('DOMContentLoaded', loadStudents);

function loadStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    updateTable(students);
}

function addStudent() {
    let studentName = document.getElementById('studentName').value.trim();
    if (studentName) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name: studentName, taskNumber: null });
        localStorage.setItem('students', JSON.stringify(students));
        updateTable(students);
        document.getElementById('studentName').value = '';
    }
}

function generateRandomNumbers() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let taskNumbers = shuffleArray([...Array(students.length).keys()].map(i => i + 1));
    
    students = students.map((student, index) => ({
        ...student,
        taskNumber: taskNumbers[index]
    }));
    localStorage.setItem('students', JSON.stringify(students));
    updateTable(students);
}

function resetStudents() {
    localStorage.removeItem('students');
    updateTable([]);
}

function updateTable(students) {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${student.name}</td><td>${student.taskNumber !== null ? student.taskNumber : ''}</td>`;
        tbody.appendChild(row);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
