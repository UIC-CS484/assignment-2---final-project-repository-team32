
      // Data from: https://data.giss.nasa.gov/gistemp/
      // Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

      window.addEventListener("load", setup);

      async function setup() {
        const ctx = document.getElementById("myChart").getContext("2d");
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(58,123,213,1)");
        gradient.addColorStop(1, "rgba(0,210,255,0.3)");

        const dataTemps = await getData();
        const myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dataTemps.years,
            datasets: [
              {
                label: "Global Temperature",
                data: dataTemps.temps,
                fill: false,
                borderColor: "#000",
                backgroundColor: gradient,
                pointBackgroundColor: "#000",
                borderWidth: 1,
              },
            ],
          },
          options: {
            radius: 5,
            hoverRadius: 12,
            responsive: false,
            scales: 1.0,
          },
        });
      }

      async function getData() {
        const response = await fetch("weather.csv");
        const data = await response.text();
        const years = [];
        const temps = [];

        const rows = data.split("\n").slice(1);
        rows.forEach((row) => {
          const cols = row.split(",");
          years.push(cols[0]);
          temps.push(14 + parseFloat(cols[1]));
        });
        return { years, temps };
      }