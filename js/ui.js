function switchTab(tabName) {
    document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function toggleTimeFormat() {
    let format = document.querySelector('input[name="time-format"]:checked').value;
    document.getElementById('time-seconds').style.display = format === 'seconds' ? 'block' : 'none';
    document.getElementById('time-hms').style.display = format === 'hms' ? 'block' : 'none';
}

function getPlaytime() {
    if (document.querySelector('input[name="time-format"]:checked').value === 'seconds') {
        return parseInt(document.getElementById('seconds').value);
    } else {
        let hours = parseInt(document.getElementById('hours').value) || 0;
        let minutes = parseInt(document.getElementById('minutes').value) || 0;
        let seconds = parseInt(document.getElementById('seconds_hms').value) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }
}

function calculate() {
    try {
        let mode = document.querySelector('input[name="mode"]:checked').value;
        let steps = parseInt(document.getElementById('steps').value);
        let deaths = parseInt(document.getElementById('deaths').value);
        let playtime = getPlaytime();

        let score = calculateScore(steps, deaths, playtime, mode);
        let rank = getRank(score, mode);

        // Update UI
        document.getElementById('results').style.display = 'block';
        document.getElementById('score').textContent = `Score: ${score.toLocaleString()}`;
        document.getElementById('rank').className = `rank ${rank}`;
        document.getElementById('rank').textContent = `Rank: ${rank}`;

        // Breakdown
        document.getElementById('step-value').textContent = `Step Value: ${calcStepValue(steps, mode).toLocaleString()}`;
        document.getElementById('dead-value').textContent = `Dead Value: ${calcDeadValue(deaths, mode).toLocaleString()}`;
        document.getElementById('playtime-score').textContent = `Playtime Score: ${calcPlaytimeScore(playtime, mode).toLocaleString()}`;
        document.getElementById('playtime-coeff').textContent = `Playtime Coefficient: ${getPlaytimeCoefficient(playtime, mode)}`;

        // Thresholds
        let thresholds = RANK_THRESHOLDS[mode];
        let tableHTML = `
            <tr><td>S</td><td>> ${thresholds[0].toLocaleString()}</td></tr>
            <tr><td>A</td><td>> ${thresholds[1].toLocaleString()}</td></tr>
            <tr><td>B</td><td>> ${thresholds[2].toLocaleString()}</td></tr>
            <tr><td>C</td><td>> ${thresholds[3].toLocaleString()}</td></tr>
            <tr><td>D</td><td>> ${thresholds[4].toLocaleString()}</td></tr>
            <tr><td>E</td><td>≤ ${thresholds[4].toLocaleString()}</td></tr>
        `;
        document.getElementById('thresholds').innerHTML = tableHTML;

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
