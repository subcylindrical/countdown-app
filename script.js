const showHolidaysBtn = document.querySelector('.show-holidays');
const holidayList = document.querySelector('.holiday-select-container');

// Event Listeners
showHolidaysBtn.addEventListener('click', (e) => {
  holidayList.classList.toggle('collapse-list');
  showHolidaysBtn.classList.toggle('float');
});

// Fetch Holiday Data
async function fetchHolidayList() {
  const holidayData = await fetch(
    'https://date.nager.at/api/v3/NextPublicHolidays/US'
  );
  const parsedHolidayData = await holidayData.json();
  console.log(parsedHolidayData);
}

fetchHolidayList();
