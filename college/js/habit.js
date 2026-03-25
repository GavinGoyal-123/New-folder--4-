document.addEventListener("DOMContentLoaded", () => {
    let habits = window.loadData('dlm_habits', []);
    
    const habitInput = document.getElementById("habit-input");
    const addHabitBtn = document.getElementById("add-habit-btn");
    const habitsList = document.getElementById("habits-list");

    if (habitsList) {
        function renderHabits() {
            habitsList.innerHTML = "";// to remove duplicacy 
            habits.forEach((habit, index) => {
                const li = document.createElement("li");
                li.className = `list-item fade-in ${habit.completed ? 'completed' : ''}`;
                
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

        renderHabits();

        
        addHabitBtn.addEventListener("click", () => {
            const title = habitInput.value.trim();
            if (title) {
                habits.push({ title, completed: false });
                window.saveData('dlm_habits', habits);
                habitInput.value = "";
                renderHabits();
            }
        });

        
        habitsList.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (index === null) return;

            if (e.target.tagName === "INPUT") {
              
                habits[index].completed = e.target.checked;
                window.saveData('dlm_habits', habits);
                renderHabits();
            } else if (e.target.tagName === "BUTTON") {
                
                habits.splice(index, 1);
                window.saveData('dlm_habits', habits);
                renderHabits();
            }
        });
    }
});