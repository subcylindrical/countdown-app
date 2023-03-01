const showHolidaysBtn = document.querySelector('.show-holidays');
const holidayListWrapper = document.querySelector('.holiday-select-container');
const holidayList = document.querySelector('.holiday-list');
const displayedHoliday = document.querySelector('.countdown-text span');
const dateDivs = document.querySelectorAll(
  '.background-container div.time-unit'
);
let holidayArray = [];
let currentInterval = 0;

// Event Listeners
showHolidaysBtn.addEventListener('click', (e) => {
  holidayListWrapper.classList.toggle('collapse-list');
  showHolidaysBtn.classList.toggle('float');
});
holidayList.addEventListener('click', setHoliday);

// Fetch Holiday Data
async function fetchHolidayList() {
  const holidayData = await fetch(
    'https://date.nager.at/api/v3/NextPublicHolidays/US'
  );
  const parsedHolidayData = await holidayData.json();
  return parsedHolidayData;
}

// Innitialize the program
function innitialize() {
  fetchHolidayList().then((hList) => {
    holidayArray = hList;
    hList.forEach((curHoliday) => {
      const newHoliday = `${curHoliday.name}`;
      let holidayNode = document.createElement('li');
      holidayNode.classList.add('holiday');
      holidayNode.id = `${hList.indexOf(curHoliday)}`;
      holidayNode.innerHTML = newHoliday;
      holidayList.appendChild(holidayNode);
    });
    setHoliday({ target: { id: 9 } });
  });
}

// Set the holiday displayed in the app
function setHoliday(e) {
  const selectHoliday = holidayArray[e.target.id];
  displayedHoliday.textContent = selectHoliday.name;
  const holidayDate = getHolidayObj(`${selectHoliday.date} 00:00`);

  const holidayUTC = Date.UTC(
    holidayDate.getFullYear(),
    holidayDate.getMonth(),
    holidayDate.getDate()
  );

  clearInterval(currentInterval);
  currentInterval = setInterval(() => {
    setTimer(holidayUTC, timeLeftToday());
  }, 1000);
}

// Set the actual timer display on the page
function setTimer(holidayUTC, timeLeftToday) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const todayUTC = Date.UTC(
    timeLeftToday.today.getFullYear(),
    timeLeftToday.today.getMonth(),
    timeLeftToday.today.getDate()
  );

  dateDivs[0].lastElementChild.textContent = Math.floor(
    (holidayUTC - todayUTC - 1) / _MS_PER_DAY
  );
  dateDivs[1].lastElementChild.textContent = Math.round(
    timeLeftToday.hoursLeft
  );
  dateDivs[2].lastElementChild.textContent = Math.round(
    timeLeftToday.minutesLeft
  );
  dateDivs[3].lastElementChild.textContent = timeLeftToday.secondsLeft;
}

// Get exact date and time
function getHolidayObj(date) {
  return new Date(date);
}

// Get the amount of time left in the current day
function timeLeftToday() {
  const today = new Date();
  const secondsLeft = 60 - today.getSeconds();
  const minutesLeft = 60 - today.getMinutes() - 1;
  const hoursLeft = 24 - today.getHours() - 1;
  return { today, hoursLeft, minutesLeft, secondsLeft };
}

innitialize();
