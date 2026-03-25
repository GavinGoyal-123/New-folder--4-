document.addEventListener("DOMContentLoaded", ()=>{
    const habits = window.loadData('dlm_habits', []);
    const tasks= window.loadData('dlm_habits', []);
    const profile = window.loadData('dlm_profile', {name: 'Gavin', goal: 'Stay productive', bio:''});
    
    const greetingEl = document.getElementById("greeting-message");
    const dateEl =document.getElementById("current-date");

    if(greetingEl && dateEl){
        //date
        const today = new Date();
        const options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'};
        dateEl.textContent = `Today is ${today.toLocaleDateString(undefined, options)}`;

        const hour = today.getHours();
        let greeting = "'Good Evening";
        if(hour<12) greeting = "Good Morning";
        else if(hour<18) greeting = "Good Afternoon";
        greetingEl.textContent = `${greeting},${profile.name} !`;

        const totalHabitsEl = document.getElementById("total-habits");
        const completedHabitsEl = document.getElementById("completed-habits");
        const totalTaskEl = document.getElementById("total-tasks");
        
        if(totalHabitsEl) totalHabitsEl.textContent = habits.length;
        if(completedHabitsEl){
            const completed = habits.filter(h => h.completed).length;
            completedHabitsEl.textContent = completed;
        }
        if(totalTaskEl) totalTaskEl.textContent = tasks.length;
    }
});