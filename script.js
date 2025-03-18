// Make calculateAge function globally available
window.calculateAge = function() {
    const dateInput = document.getElementById('date');
    const result = document.getElementById('result');
    const daysLived = document.getElementById('days-lived');
    const hoursLived = document.getElementById('hours-lived');
    const minutesLived = document.getElementById('minutes-lived');
    const nextBirthdayCountdown = document.getElementById('next-birthday-countdown');
    
    const birthDate = new Date(dateInput.value);
    const today = new Date();
    
    // Clear any existing error first
    clearError();
    
    if (!dateInput.value) {
        showError('Please select your birth date');
        return;
    }

    if (birthDate > today) {
        showError('Please select a date in the past');
        return;
    }

    // Calculate age components
    const ageInMilliseconds = today - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    const ageInMonths = Math.floor((ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const ageInDays = Math.floor((ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    
    const totalDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
    const totalHours = Math.floor(ageInMilliseconds / (60 * 60 * 1000));
    const totalMinutes = Math.floor(ageInMilliseconds / (60 * 1000));
    
    // Calculate next birthday
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (24 * 60 * 60 * 1000));

    // Animate results
    result.style.opacity = '0';
    setTimeout(() => {
        result.innerHTML = `You are <span>${ageInYears}</span> years, <span>${ageInMonths}</span> months, and <span>${ageInDays}</span> days old`;
        result.style.opacity = '1';
    }, 300);

    // Animate detailed results
    animateValue(daysLived, 0, totalDays, 1000);
    animateValue(hoursLived, 0, totalHours, 1000);
    animateValue(minutesLived, 0, totalMinutes, 1000);
    
    nextBirthdayCountdown.textContent = `${daysToNextBirthday} days`;
}

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const calculateBtn = document.getElementById('calculate');
    
    // Set max date to today
    dateInput.max = new Date().toISOString().split('T')[0];
    
    // Add input validation
    dateInput.addEventListener('input', (e) => {
        const date = new Date(e.target.value);
        const today = new Date();
        
        clearError(); // Clear any existing error message first
        
        if (date > today) {
            showError('Please select a date in the past');
        }
    });

    // Add event listeners
    calculateBtn.addEventListener('click', calculateAge);
    dateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });

    // Add smooth transitions for hover effects
    const cards = document.querySelectorAll('.result-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Show error message
function showError(message) {
    clearError(); // Clear any existing error first
    
    const dateInput = document.getElementById('date');
    // Check if error message already exists
    if (!dateInput.parentNode.querySelector('.error-message')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        dateInput.parentNode.appendChild(errorDiv);
        dateInput.classList.add('error');
    }
}

// Clear error message
function clearError() {
    const dateInput = document.getElementById('date');
    const errorMessages = dateInput.parentNode.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    dateInput.classList.remove('error');
}

// Add smooth animation for results
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
