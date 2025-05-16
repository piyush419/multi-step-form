
import React, { useState } from 'react';
import './Step2.css';

const Step2 = ({ formData, updateForm, prevStep, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.profession) errs.profession = "Please select a profession";
    if (formData.profession === 'Entrepreneur' && !formData.companyName) {
      errs.companyName = "Company name is required for Entrepreneur";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="step2-container">
      <h2 className="step2-title">Professional Details</h2>

      <div className="form-group">
        <label htmlFor="profession" className="form-label">Profession</label>
        <select
          id="profession"
          value={formData.profession}
          onChange={e => updateForm({ profession: e.target.value })}
          className="form-select"
        >
          <option value="">Select</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && <div className="error-text">{errors.profession}</div>}
      </div>

      {formData.profession === 'Entrepreneur' && (
        <div className="form-group">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={e => updateForm({ companyName: e.target.value })}
            className="form-input"
          />
          {errors.companyName && <div className="error-text">{errors.companyName}</div>}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
        <input
          type="text"
          id="addressLine1"
          value={formData.addressLine1}
          onChange={e => updateForm({ addressLine1: e.target.value })}
          className="form-input"
        />
      </div>

      <div className="step2-buttons">
        <button onClick={prevStep} className="btn back-btn">Back</button>
        <button onClick={handleNext} className="btn next-btn">Next</button>
      </div>
    </div>
  );
};

export default Step2;
