// Utils 
const fn = require('../utils/functions');

// Models 
const Profile = require('../models/Profile');
const Job = require('../models/Job');

const reloadHomepage = async (req, res) => {
  try {
    // getting data
    const [jobs, profile] = await Promise.all([Job.find({}), Profile.findOne({})]);

    console.log(jobs, profile)
    // const jobs = await Job.find({});
    // const profile = await Profile.findOne({});

    // Reseting 
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }
    
    let jobTotalHours = 0;
    statusCount.progress = 0;
    statusCount.done = 0;

    const updatedJobs = jobs.map(job => {
      // get remaining days
      const remaining = fn.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress'; // to set in the class
  
      // adding the proper status: done or progress
      statusCount[status] += 1;
  
      // total hours per day working in each in progress project/job
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours; 

      return { 
        ...job.toObject(),
        remaining,
        status,
        budget: fn.calculateBudget(job, profile['value-hour'])
       };
    });
  
    let freeHours = profile['hours-per-day'] - jobTotalHours;

    res.render('index', { jobs: updatedJobs, profile, status: statusCount, freeHours });

  } catch(err) {
    res.send(err.message);
  }
}

module.exports = { reloadHomepage };