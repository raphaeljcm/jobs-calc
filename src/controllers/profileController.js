// Models
const Profile = require('../models/Profile');

const showProfile = (req, res) => res.render('profile', { profile: Profile.get() });

const updateProfile = (req, res) => {
  const data = req.body;
  
  const weeksPerYear = 52;
  const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
  const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
  const monthlyTotalHours = weeksPerMonth * weekTotalHours;

  // What's gonna be the value of my hour
  const valueHour = data['monthly-budget'] / monthlyTotalHours;

  Profile.update({
    ...Profile.get(),
    ...req.body,
    'value-hour': valueHour
  });

  res.redirect('/profile');
}

module.exports = { showProfile, updateProfile };