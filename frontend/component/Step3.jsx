import React, { useState, useEffect } from 'react';
import './Step3.css';
import { API } from '../utils/contants';

const Step3 = ({ formData, updateForm, prevStep, nextStep }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`${API}/countries`)
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`${API}/states/${formData.country}`)
        .then(res => res.json())
        .then(data => setStates(data));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetch(`${API}/cities/${formData.country}/${formData.state}`)
        .then(res => res.json())
        .then(data => setCities(data));
    }
  }, [formData.state]);

  const validate = () => {
    const errs = {};
    if (!formData.country) errs.country = "Country is required";
    if (!formData.state) errs.state = "State is required";
    if (!formData.city) errs.city = "City is required";
    if (!formData.subscriptionPlan) errs.subscriptionPlan = "Subscription plan is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="step3-container">
      <h2 className="step3-title">Preferences</h2>

      <div className="form-group">
        <label htmlFor="country" className="form-label">Country</label>
        <select
          id="country"
          value={formData.country}
          onChange={e => updateForm({ country: e.target.value, state: '', city: '' })}
          className="form-select"
        >
          <option value="">Select</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <div className="error-text">{errors.country}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="state" className="form-label">State</label>
        <select
          id="state"
          value={formData.state}
          onChange={e => updateForm({ state: e.target.value, city: '' })}
          className="form-select"
        >
          <option value="">Select</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <div className="error-text">{errors.state}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="city" className="form-label">City</label>
        <select
          id="city"
          value={formData.city}
          onChange={e => updateForm({ city: e.target.value })}
          className="form-select"
        >
          <option value="">Select</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <div className="error-text">{errors.city}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Subscription Plan</label>
        {["Basic", "Pro", "Enterprise"].map(plan => (
          <div key={plan} className="radio-option">
            <label>
              <input
                type="radio"
                name="subscriptionPlan"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={e => updateForm({ subscriptionPlan: e.target.value })}
              />
              {plan}
            </label>
          </div>
        ))}
        {errors.subscriptionPlan && <div className="error-text">{errors.subscriptionPlan}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={formData.newsletter ?? true}
            onChange={e => updateForm({ newsletter: e.target.checked })}
          />
          Subscribe to our newsletter
        </label>
      </div>

      <div className="step3-buttons">
        <button onClick={prevStep} className="btn back-btn">Back</button>
        <button onClick={handleNext} className="btn next-btn">Next</button>
      </div>
    </div>
  );
};

export default Step3;
