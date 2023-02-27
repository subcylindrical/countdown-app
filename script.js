async function fetchHolidayList() {
  const holidayData = await fetch(
    'https://date.nager.at/api/v3/NextPublicHolidays/US'
  );
  const parsedHolidayData = await holidayData.json();
  console.log(parsedHolidayData);
}

fetchHolidayList();
