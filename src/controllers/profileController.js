// Models
const Profile = require('../models/Profile');

const showProfile = async (req, res) => {
  try {
    const doc = await Profile.findOne({});

    res.render('profile', { profile: doc });
  } catch(err) {
    res.send(err.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = req.body;
  
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;

    // What's gonna be the value of my hour
    const valueHour = data['monthly-budget'] / monthlyTotalHours;

    const profile = await Profile.findOne({});
    const id = profile._id;
    const updatedData = {
      ...profile.toObject(),
      ...req.body,
      'value-hour': valueHour
    }

    const doc = await Profile.updateOne({ _id: id }, updatedData);

    res.redirect('/profile');
  } catch(err) {
    res.send(err.message);
  }

}

module.exports = { showProfile, updateProfile };