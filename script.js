let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result")

function calculateAge() {
  const birthDate = new Date(document.getElementById('date').value);
  const today = new Date();
  
  if (birthDate > today) {
    alert('Please select a date in the past');
    return;
  }
  
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
  
  // Update results
  document.getElementById('result').innerHTML = `You are <span>${ageInYears}</span> years, <span>${ageInMonths}</span> months, and <span>${ageInDays}</span> days old`;
  document.getElementById('days-lived').textContent = totalDays.toLocaleString();
  document.getElementById('hours-lived').textContent = totalHours.toLocaleString();
  document.getElementById('minutes-lived').textContent = totalMinutes.toLocaleString();
  document.getElementById('next-birthday-countdown').textContent = `${daysToNextBirthday} days until your next birthday!`;
  
  // Animate results
  animateResults();
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

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
