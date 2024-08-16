
exports.rName = function generateRandomName() {
    const rName = `test${Math.floor(Math.random() * 1000)}`;
    return rName;
};

exports.rFName = function generateRandomFName(){
    const firstNames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user'];
    const rFName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return `${rFName}`;
};