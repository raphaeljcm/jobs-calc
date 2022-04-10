// Services
const fn = require('../services/functions');

// Controllers
const profileController = require('../controllers/profileController');

// Temporary data
let jobs = [];

// move it later
const reloadHomepage = (req, res) => {
  const updatedJobs = jobs.map(job => {
    // get remaining days
    const remaining = fn.remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress'; // to set in the class

    return { 
      ...job,
      remaining,
      status,
      budget: fn.calculateBudget(job, profileController.profile['value-hour'])
     };
  });

  const name = profileController.profile.name;
  const avatar = profileController.profile.avatar;
  const profile = { name, avatar };

  res.render('index', { jobs: updatedJobs, profile });
}

const createAJob = (req, res) => {
  const lastId = jobs.at(-1)?.id || 0;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now()
  });

  res.redirect('/');
}

const showAJob = (req, res) => {
  const jobId = req.params.id; // it is a string
 
  const job = jobs.find(job => Number(job.id) === Number(jobId));

  if(!job) {
    res.send('Job not found!');
  }

  job.budget = fn.calculateBudget(job, profileController.profile['value-hour']);

  res.render('job-edit', { job });
}

const updateAJob = (req, res) => {
  const jobId = req.params.id; // it is a string
 
  const job = jobs.find(job => Number(job.id) === Number(jobId));

  if(!job) {
    res.send('Job not found!');
  }

  const updatedJob = {
    ...job,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours']
  }

  jobs = jobs.map(job => {
    if(Number(job.id) === Number(jobId)) {
      job = updatedJob;
    }

    return job;
  });

  res.redirect(`/job/edit/${jobId}`);
}

const deleteAJob = (req, res) => {
  const jobId = req.params.id;

  jobs = jobs.filter(job => Number(job.id) !== Number(jobId));

  res.redirect('/');
}

module.exports = { jobs, createAJob, showAJob, updateAJob, reloadHomepage, deleteAJob };