const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

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
						date: "2022-11-18T20:00:00.000Z",
						time: [9, 7, 8, 6],
					},
					{
						date: "2022-12-02T20:00:00.000Z",
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
						date: "2022-11-18T20:00:00.000Z",
						time: [10, 8, 3, 12],
					},
					{
						date: "2022-11-25T20:00:00.000Z",
						time: [6, 8, 9, 11],
					},
					{
						date: "2022-12-02T20:00:00.000Z",
						time: [10, 11, 4, 8],
					},
					{
						date: "2022-12-09T20:00:00.000Z",
						time: [9, 8, 9, 11],
					},
				],
			},
		},
	},
};

// Only edit below this comment

/**
 * Converts an ISO date string to a date object, formats it to (d MMM YYYY), and returns it as a string.
 * @param {string} date An ISO date string.
 * @returns {string} Returns a formatted date as a string.
 */
const toDateFormat = (date) => {
	const dateFormat = { dateStyle: "medium" };
	const toDate = new Date(date);
	return toDate.toLocaleDateString("en-GB", dateFormat);
};

/**
 * Takes in an array of numbers (minutes) and sums them together.
 * The total minutes result is then converted to a specific time format (hh:mm) and the time is returned as a string.
 * @param {number[]} arr An array of numbers representing minutes.
 * @returns {string} Returns the sum of passed numbers (minutes) as a time formatted string (hh:mm).
 */
const toTimeFormat = (arr) => {
	let totalMins = undefined;

	arr.forEach((lapMins) => {
		totalMins === undefined ? (totalMins = lapMins) : (totalMins += lapMins);
	});

	const hours = String(Math.floor(totalMins / 60));
	const mins = String(totalMins % 60);

	const formattedHours = hours.length === 1 ? hours.padStart(2, "0") : hours;
	const formattedMins = mins.length === 1 ? mins.padStart(2, "0") : mins;

	const time = `${formattedHours}:${formattedMins}`;
	return time;
};

const {
	response: {
		data: { NM372: athlete1, SV782: athlete2 },
	},
} = data;

const createHtml = (athlete) => {
	const { firstName, surname, id, races } = athlete;
	const racesCopy = JSON.parse(JSON.stringify(races));
	const [{ date: recentRaceDate, time: recentRaceTime }] = racesCopy.reverse();

	const totalRaces = races.length;
	const date = toDateFormat(recentRaceDate);
	const time = toTimeFormat(recentRaceTime);

	const fragment = document.createDocumentFragment();

	const header = document.createElement("h2");
	const dList = document.createElement("dl");
	header.textContent = id;
	dList.innerHTML = `
	<dt>Athlete:</dt>
	<dd>${firstName} ${surname}</dd>

	<dt>Total Races:</dt>
	<dd>${totalRaces}</dd>

	<dt>Event Date (Latest):</dt>
	<dd>${date}</dd>

	<dt>Total Time (Latest):</dt>
	<dd>${time}</dd>
    `;

	fragment.append(header, dList);
	return fragment;
};

document
	.querySelector("[data-athlete='NM372']")
	.appendChild(createHtml(athlete1));

document
	.querySelector("[data-athlete='SV782']")
	.appendChild(createHtml(athlete2));
