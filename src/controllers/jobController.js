// Utils
const fn = require('../utils/functions');

// Models
const Profile = require('../models/Profile');
const Job = require('../models/Job');

// move it later
const reloadHomepage = (req, res) => {
  const jobs = Job.get(); 
  const profile = Profile.get();

  const updatedJobs = jobs.map(job => {
    // get remaining days
    const remaining = fn.remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress'; // to set in the class

    return { 
      ...job,
      remaining,
      status,
      budget: fn.calculateBudget(job, profile['value-hour'])
     };
  });

  const name = profile.name;
  const avatar = profile.avatar;
  const profileData = { name, avatar };

  res.render('index', { jobs: updatedJobs, profile: profileData });
}

const createAJob = (req, res) => {
  const lastId = Job.get().at(-1)?.id || 0;

  Job.get().push({
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
 
  const job = Job.get().find(job => Number(job.id) === Number(jobId));

  if(!job) {
    res.send('Job not found!');
  }

  job.budget = fn.calculateBudget(job, Profile.get()['value-hour']);

  res.render('job-edit', { job });
}

const updateAJob = (req, res) => {
  const jobId = req.params.id; // it is a string
 
  const job = Job.get().find(job => Number(job.id) === Number(jobId));

  if(!job) {
    res.send('Job not found!');
  }

  const updatedJob = {
    ...job,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours']
  }

  const newJobs = Job.get().map(job => {
    if(Number(job.id) === Number(jobId)) {
      job = updatedJob;
    }

    return job;
  });

  Job.update(newJobs);

  res.redirect(`/job/edit/${jobId}`);
}

const deleteAJob = (req, res) => {
  const jobId = req.params.id;
  
  Job.delete(jobId);

  res.redirect('/');
}

module.exports = { createAJob, showAJob, updateAJob, reloadHomepage, deleteAJob };