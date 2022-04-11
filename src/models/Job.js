// Temporary data
let jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 1,
    created_at: Date.now()
  }
];

module.exports = {
  get: () => {
    return jobs;
  }, 
  update: (newData) => {
    jobs = newData;
  },
  delete: (jobId) => {
    jobs = jobs.filter(job => Number(job.id) !== Number(jobId));
  }
};