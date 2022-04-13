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
    await job.save();

    res.redirect('/');
  } catch(err) {
    res.send(err.message);
  }
}

const showAJob = async (req, res) => {
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

const updateAJob = async (req, res) => {
  try {
    const jobId = req.params.id; // it is a string
    const allJobs = await Job.find({});
   
    const job = allJobs.find(job => Number(job.id) === Number(jobId));
  
    if(!job) {
      res.send('Job not found!');
    }
  
    const updatedJob = {
      ...job.toObject(),
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours']
    }

    await Job.updateOne({ _id: jobId }, updatedJob);
  
    res.redirect(`/job/edit/${jobId}`);
  } catch(err) {
    res.send(err.message);
  }
}

const deleteAJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    await Job.findByIdAndDelete(jobId);
  
    res.redirect('/');
  } catch(err) {
    res.send(err.message);
  }
}

module.exports = { createAJob, showAJob, updateAJob, deleteAJob };