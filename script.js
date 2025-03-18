let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result");

// Add input event listener for real-time validation
userInput.addEventListener('input', function() {
    const selectedDate = new Date(this.value);
    const today = new Date();
    
    if (selectedDate > today) {
        this.setCustomValidity('Please select a date in the past');
    } else {
        this.setCustomValidity('');
    }
});

function calculateAge() {
    const birthDate = new Date(document.getElementById('date').value);
    const today = new Date();
    
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
    
    // Update results with animations
    updateResultWithAnimation('result', `You are <span>${ageInYears}</span> years, <span>${ageInMonths}</span> months, and <span>${ageInDays}</span> days old`);
    updateResultWithAnimation('days-lived', totalDays.toLocaleString());
    updateResultWithAnimation('hours-lived', totalHours.toLocaleString());
    updateResultWithAnimation('minutes-lived', totalMinutes.toLocaleString());
    updateResultWithAnimation('next-birthday-countdown', `${daysToNextBirthday} days until your next birthday!`);
    
    // Animate cards
    animateResults();
}

function updateResultWithAnimation(elementId, newValue) {
    const element = document.getElementById(elementId);
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        element.innerHTML = newValue;
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 150);
}

function animateResults() {
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

function showError(message) {
    const input = document.getElementById('date');
    input.classList.add('error');
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        input.classList.remove('error');
        errorDiv.remove();
    }, 3000);
}

// Add keyboard support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAge();
    }
});

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
