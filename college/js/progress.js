document.addEventListener("DOMContentLoaded", () =>{
    const habits = window.loadData('dlm_habits', []);
    const tasks = window.loadData('dlm_habits', []);

    const habitsProgressEl = document.getElementById("habits-progress");
    const tasksProgressEl = document.getElementById("tasks-progress");
    const habitsCircleEl = document.getElementById("habits-circle");


    if(habitsProgressEl) {
        const totalHabits = habits.length;
        const compHabits =habits.filter(h => h.completed).length;
        let percentage = 0;

        if(totalHabits>0){
            percentage = Math.round((compHabits/totalHabits)* 100);
        }
        habitsProgressEl.textContent = `${compHabits} / ${totalHabits} Completed`;
        if(habitsCircleEl){
            habitsCircleEl.style.setProperty('--percentage', `${percentage}%`);
            habitsCircleEl.querySelector('.progress-text').textContent =`${percentage}%`;
        }
        if(tasksProgressEl){
            tasksProgressEl.textContent =`${tasks.length} Total Tasks`;
        }
    }
})