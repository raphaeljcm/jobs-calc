//Temporary data
let profile = {
  name: 'Raphael Marques',
  avatar: 'https://github.com/raphaeljcm.png',
  'monthly-budget': 1500,
  'days-per-week': 5,
  'hours-per-day': 6, 
  'vacation-per-year': 4,
  'value-hour': 12.5
}

const showProfile = (req, res) => res.render('profile', { profile });

const updateProfile = (req, res) => {
  const data = req.body;
  
  const weeksPerYear = 52;
  const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
  const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
  const monthlyTotalHours = weeksPerMonth * weekTotalHours;

  // What's gonna be the value of my hour
  const valueHour = data['monthly-budget'] / monthlyTotalHours;

  profile = {
    ...profile,
    ...req.body,
    'value-hour': valueHour
  }

  res.redirect('/profile');
}

module.exports = { profile, showProfile, updateProfile };