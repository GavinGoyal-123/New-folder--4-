document.addEventListener("DOMContentLoaded", () => {

    let habits = window.loadData('dlm_habits', []);
    let weekly = window.loadData('dlm_weekly', []);
    const habitInput = document.getElementById("habit-input");
    const addHabitBtn = document.getElementById("add-habit-btn");
    const habitsList = document.getElementById("habits-list");
    const weeklyList = document.getElementById("weekly-list");
    const weeklyInput = document.getElementById("w-input");
    const addWeeklyBtn = document.getElementById("add-weekly");


    function renderHabits() {
        habitsList.innerHTML = "";
        habits.forEach((habit, index) => {
            const li = document.createElement("li");
            li.className = `list-item ${habit.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="item-left">
                    <input type="checkbox" ${habit.completed ? "checked" : ""} data-index="${index}">
                    <span>${habit.title}</span>
                </div>
                <button class="danger" data-index="${index}">Delete</button>
            `;
            habitsList.appendChild(li);
        });
    }

    addHabitBtn.addEventListener("click", () => {
        const title = habitInput.value.trim();
        if (!title) return;
        habits.push({ title, completed: false });
        window.saveData('dlm_habits', habits);
        habitInput.value = "";
        renderHabits();
    });

    habitsList.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (index === null) return;
        if (e.target.tagName === "INPUT") {
            habits[index].completed = e.target.checked;
        }
        if (e.target.tagName === "BUTTON") {
            habits.splice(index, 1);
        }
        window.saveData('dlm_habits', habits);
        renderHabits();
    });

    renderHabits();


    function renderWeekly() {
        weeklyList.innerHTML = "";
        weekly.forEach((item, index) => {
            const checkedDays = item.days.filter(d => d).length;
            const progress = Math.round((checkedDays / 7) * 100);
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.title}</td>
                ${item.days.map((day, i) => `
                    <td>
                        <input type="checkbox" ${day ? "checked" : ""} data-index="${index}" data-day="${i}">
                    </td>
                `).join("")}
                <td>
                    <progress value="${progress}" max="100"></progress>
                </td>
                <td>
                    <button class="danger" data-delete="${index}">Delete</button>
                </td>
            `;

            weeklyList.appendChild(tr);
        });
    }

    addWeeklyBtn.addEventListener("click", () => {
        const title = weeklyInput.value.trim();
        if (!title) return;
        weekly.push({
            title: title,
            days: [false, false, false, false, false, false, false]
        });
        window.saveData('dlm_weekly', weekly);
        weeklyInput.value = "";
        renderWeekly();
    });

    weeklyList.addEventListener("click", (e) => {

        if (e.target.tagName === "INPUT") {
            const index = e.target.getAttribute("data-index");
            const day = e.target.getAttribute("data-day");
            weekly[index].days[day] = e.target.checked;
            window.saveData('dlm_weekly', weekly);
            renderWeekly();
        }

        if (e.target.tagName === "BUTTON") {
            const index = e.target.getAttribute("data-delete");
            weekly.splice(index, 1);
            window.saveData('dlm_weekly', weekly);
            renderWeekly();
        }
    });

    renderWeekly();
});