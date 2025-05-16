import Location from "../models/Location.js";
import User from "../models/User.js";

export const check_username =  async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json({ available: !user });
}

export const getAllCountries = async (req, res) => {
  const countries = await Location.find().select('country -_id');
  res.json(countries.map(c => c.country));
}

export const getAllStates = async (req, res) => {
  const location = await Location.findOne({ country: req.params.country });
  if (!location) return res.status(404).json({ error: 'Country not found' });
  res.json(location.states.map(s => s.name));
}

export const getAllCities = async (req, res) => {
  const location = await Location.findOne({ country: req.params.country });
  if (!location) return res.status(404).json({ error: 'Country not found' });

  const state = location.states.find(s => s.name === req.params.state);
  if (!state) return res.status(404).json({ error: 'State not found' });

  res.json(state.cities);
}

export const updateUser =  async (req, res) => {
  try {
    const {
      username,
      currentPassword,
      newPassword,
      gender,
      customGender,
      dob,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter
    } = req.body;

    let user = await User.findOne({ username });

    if (user && currentPassword && user.password !== currentPassword) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    if (!user) {
      user = new User({ username });
    }

    user.gender = gender === 'Other' ? customGender : gender;
    user.customGender = gender === 'Other' ? customGender : '';
    user.dob = dob;
    user.profession = profession;
    user.companyName = profession === 'Entrepreneur' ? companyName : '';
    user.addressLine1 = addressLine1;
    user.country = country;
    user.state = state;
    user.city = city;
    user.subscriptionPlan = subscriptionPlan;
    user.newsletter = newsletter === 'true' || newsletter === true;

    if (newPassword) user.password = newPassword;
    if (req.file) user.profilePic = req.file.filename;

    await user.save();
    res.json({ success: true, message: 'Profile updated successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}