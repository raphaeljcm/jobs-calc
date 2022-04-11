let Profile = {
  name: 'Raphael Marques',
  avatar: 'https://github.com/raphaeljcm.png',
  'monthly-budget': 1500,
  'days-per-week': 5,
  'hours-per-day': 6, 
  'vacation-per-year': 4,
  'value-hour': 12.5
}

module.exports = {
  get: () => {
    return Profile;
  },
  update: (newUser) => {
    Profile = newUser;
  }
};