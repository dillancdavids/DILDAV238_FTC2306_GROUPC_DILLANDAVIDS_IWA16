const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [9, 7, 8, 6],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [10, 8, 3, 12],
          },
          {
            date: '2022-11-25T20:00:00.000Z',
            time: [6, 8, 9, 11],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [10, 11, 4, 8],
          },
          {
            date: '2022-12-09T20:00:00.000Z',
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

const createHtml = (athleteData) => {
  const { firstName, surname, id, races } = athleteData;
  const [latestRace] = races.slice(-1); // Get the latest race by using slice(-1)
  const [date, timeAsArray] = [latestRace.date, latestRace.time];
  
  const fragment = document.createDocumentFragment();

  const title = document.createElement("h2");
  title.textContent = `Athlete: ${firstName} ${surname}`;
  fragment.appendChild(title);

  const list = document.createElement("dl");

  const raceDate = new Date(date);
  const day = raceDate.getDate();
  const month = MONTHS[raceDate.getMonth()];
  const year = raceDate.getFullYear();

  const total = timeAsArray.reduce((acc, lapTime) => acc + lapTime, 0);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  list.innerHTML = /* html */ `
    <dt>Full Name</dt>
    <dd>${firstName} ${surname}</dd>

    <dt>Total Races</dt>
    <dd>${races.length}</dd>

    <dt>Event Date (Latest)</dt>
    <dd>${day} ${month} ${year}</dd>

    <dt>Total Time (Latest)</dt>
    <dd>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</dd>
  `;

  fragment.appendChild(list);

  return fragment;
};

const NM372 = data.response.data.NM372;
const SV782 = data.response.data.SV782;

document.querySelector('[data-athlete="NM372"]').appendChild(createHtml(NM372));
document.querySelector('[data-athlete="SV782"]').appendChild(createHtml(SV782));
