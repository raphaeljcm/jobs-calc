const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  'daily-hours': { type: Number, required: true },
  'total-hours': { type: Number, required: true },
  created_at: { type: Date, required: true }
});

// module.exports = {
//   get: () => {
//     return jobs;
//   }, 
//   update: (newData) => {
//     jobs = newData;
//   },
//   delete: (jobId) => {
//     console.log(jobs)
//     jobs = jobs.filter(job => Number(job.id) !== Number(jobId));
//     console.log(jobs)
  
//   }
// };

module.exports = mongoose.model('Job', jobSchema);