let cities = [
  {
    arabName: "الرياض",
    name: "Ar Riyāḑ",
  },
  {
    arabName: "القصيم",
    name: "Al Qaşīm",
  },
  {
    arabName: "الشرقية",
    name: "Ash Sharqīyah",
  },
  {
    arabName: "مكة",
    name: "Makkah al Mukarramah",
  },
];
for (city of cities) {
  let content = `
    <option>${city.arabName}</option>
    `;
  document.getElementById("options-selected").innerHTML += content;
}

document
  .getElementById("options-selected")
  .addEventListener("change", function () {
    document.getElementById("city_name").innerHTML = this.value;
    let cityName = "";
    for (let city of cities) {
      if (city.arabName == this.value) {
        cityName = city.name;
      }
      prayerTimesAcordingToCities(cityName);
    }
  });

function prayerTimesAcordingToCities(city) {
  let params = {
    city: city, //"Ar Riyāḑ",
    country: "SA",
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      fullTimeForAllprayer("Fajr_time", timings.Fajr);
      fullTimeForAllprayer("Sunrise_time", timings.Sunrise);
      fullTimeForAllprayer("Dhuhr_time", timings.Dhuhr);
      fullTimeForAllprayer("Asr_time", timings.Asr);
      fullTimeForAllprayer("Maghrib_time", timings.Maghrib);
      fullTimeForAllprayer("Isha_time", timings.Isha);
      const readableDate = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      const date = weekDay + " " + readableDate;
      document.getElementById("time").innerHTML = date;
      // document.getElementById("Fajr_time").innerHTML = timings.Fajr;
    })
    .catch(function (error) {
      console.log(error);
    });
}
prayerTimesAcordingToCities("Ar Riyāḑ");

function fullTimeForAllprayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
