const RANK_THRESHOLDS = {
    Normal: [449999, 319999, 249999, 119999, 29999],
    Roguelike: [599999, 499999, 399999, 299999, 199999]
};

const STEP_THRESHOLDS = {
    Normal: [3200, 3500, 4000, 4500, 5000],
    Roguelike: [601, 801, 1001, 2001]
};

const DEAD_THRESHOLDS = {
    Normal: [2, 3, 6, 11, 20],
    Roguelike: [2, 3, 6, 11, 20]
};

const PLAYTIME_THRESHOLDS = {
    Normal: [1200, 1500, 1800, 2200, 2700, 3600, 5400],
    Roguelike: [241, 481, 601, 1500, 1800, 2700]
};

const PLAYTIME_BASE = {
    Normal: 10000,
    Roguelike: 10000
};
