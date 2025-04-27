function calcStepValue(steps, mode) {
    let num = 10000 - steps;
    let thresholds = STEP_THRESHOLDS[mode];
    let num2 = 1;
    
    if (mode === "Roguelike") {
        if (steps < thresholds[0]) num2 = 7;
        else if (steps < thresholds[1]) num2 = 6;
        else if (steps < thresholds[2]) num2 = 5;
        else if (steps < thresholds[3]) num2 = 3;
        else if (num < thresholds[3]) num = thresholds[3];
    } else {
        if (steps < thresholds[0]) num2 = 7;
        else if (steps < thresholds[1]) num2 = 6;
        else if (steps < thresholds[2]) num2 = 5;
        else if (steps < thresholds[3]) num2 = 4;
        else if (steps < thresholds[4]) num2 = 3;
        else if (num < thresholds[4]) num = thresholds[4];
    }
    return num * num2;
}

function calcDeadValue(deadCount, mode) {
    let num = mode === "Normal" ? 100 : 1000;
    let thresholds = DEAD_THRESHOLDS[mode];
    let num2 = 1;
    
    let num3 = num - deadCount;
    
    if (deadCount === 0) num2 = 25;
    else if (deadCount < thresholds[0]) num2 = 15;
    else if (deadCount < thresholds[1]) num2 = 10;
    else if (deadCount < thresholds[2]) num2 = 7;
    else if (deadCount < thresholds[3]) num2 = 5;
    else if (deadCount < thresholds[4]) num2 = 3;
    else num3 = num - thresholds[4];
    
    return num3 * num2;
}

function getPlaytimeCoefficient(playtime, mode) {
    let thresholds = PLAYTIME_THRESHOLDS[mode];
    
    if (mode === "Roguelike") {
        if (playtime < thresholds[0]) return 12;
        if (playtime < thresholds[1]) return 10;
        if (playtime < thresholds[2]) return 8;
        if (playtime < thresholds[3]) return 7;
        if (playtime < thresholds[4]) return 5;
        if (playtime < thresholds[5]) return 3;
    } else {
        if (playtime < thresholds[0]) return 12;
        if (playtime < thresholds[1]) return 11;
        if (playtime < thresholds[2]) return 10;
        if (playtime < thresholds[3]) return 8;
        if (playtime < thresholds[4]) return 7;
        if (playtime < thresholds[5]) return 5;
        if (playtime < thresholds[6]) return 3;
    }
    return 1;
}

function calcPlaytimeScore(playtime, mode) {
    let thresholds = PLAYTIME_THRESHOLDS[mode];
    let num = thresholds[mode === "Normal" ? 6 : 5];
    let num2 = Math.min(playtime, num);
    return PLAYTIME_BASE[mode] - num2;
}

function calculateScore(steps, deadCount, playtime, mode) {
    let stepValue = calcStepValue(steps, mode);
    let deadValue = calcDeadValue(deadCount, mode);
    let playtimeCoefficient = getPlaytimeCoefficient(playtime, mode);
    let playtimeScore = calcPlaytimeScore(playtime, mode);
    
    return Math.floor((stepValue + deadValue + playtimeScore) * playtimeCoefficient);
}

function getRank(score, mode) {
    let thresholds = RANK_THRESHOLDS[mode];
    if (score > thresholds[0]) return "S";
    if (score > thresholds[1]) return "A";
    if (score > thresholds[2]) return "B";
    if (score > thresholds[3]) return "C";
    if (score > thresholds[4]) return "D";
    return "E";
}
