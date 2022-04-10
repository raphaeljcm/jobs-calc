const remainingDays = job => {
  const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed(); // toFixed return a string, so it needs to be converted into a number
    
  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDays); // getDate gets the days of the month
  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();

  // Converting milliseconds to days
  const dayInMs = 1000 * 60 * 60 * 24; 
  // 1000ms = 1s -> 60.000ms = 1m -> 3.600.000ms = 1h -> 86,400,000ms = 24h/1day

  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  // remaining days
  return dayDiff;
}

const calculateBudget = (job, valueHour) => valueHour * job['total-hours'];

module.exports = { remainingDays, calculateBudget }