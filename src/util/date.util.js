const getDate = (year, month, selectedYear) => {
    let years = [];
    for (let i = year; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    if (selectedYear === years[0]) {
        for (let i = 0; i < month; i++) {
            months.shift();
        }
    }

    if (selectedYear === new Date().getFullYear()) {
        for (let i = 12; i > new Date().getMonth(); i--) {
            months.pop();
        }
    }

    return {
        years: years,
        months: months
    }
}

const DateUtil = {getDate};

export default DateUtil;