document.addEventListener('DOMContentLoaded',function(){

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved user preference in localstorage
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme default to light if no preference is saved
    if(savedTheme == 'dark') {
        // Apply dark theme if explicitly saved
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }else {
        // Default to light theme
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        //Save this preferance in localStorage
        localStorage.setItem('theme','light');
    }


    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click',function(){

        //check if dark theme is currently applied
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if(isDark){
            // Switch to the light mode
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            // save the preference in localstorage
            localStorage.setItem('theme','light');
        } else {
            // switch to the dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            //save the preference in local storage')
            localStorage.setItem('theme','dark');
        }

    });

});