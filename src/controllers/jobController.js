// Utils
const fn = require('../utils/functions');

// Models
const Profile = require('../models/Profile');
const Job = require('../models/Job');

const createAJob = async (req, res) => {
  try {
    const allJobs = await Job.find({});
    const lastId = allJobs.at(-1)?._id || 0;

    const data = {
      _id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now()
    }
  
    const job = new Job(data);
    const doc = await job.save();

    res.redirect('/');
  } catch(err) {
    res.send(err.message);
  }
}

const showAJob = async (req, res) => {
  console.log('dkas')
  const jobId = req.params.id; // it is a string
 
  const allJobs = await Job.find({});
  const profile = await Profile.findOne({});
  const job = allJobs.find(job => Number(job.id) === Number(jobId));

  if(!job) {
    res.send('Job not found!');
  }

  job.budget = fn.calculateBudget(job, profile['value-hour']);

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
  console.log(Job.get())
  
  Job.delete(jobId);

  res.redirect('/');
}

module.exports = { createAJob, showAJob, updateAJob, deleteAJob };