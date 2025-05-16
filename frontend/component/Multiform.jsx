import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Summary from './Summary';
import { API } from '../utils/contants';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: '',
    currentPassword: '',
    newPassword: '',
    profession: '',
    companyName: '',
    addressLine1: '',
    country: '',
    state: '',
    city: '',
    subscriptionPlan: 'Basic',
    newsletter: true
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const updateForm = updates => {
    setFormData(prev => ({ ...prev, ...updates }));
  };



  const handleSubmit = () => {
    fetch(`${API}/update-profile`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Profile updated successfully!');
        } else {
          alert('Error updating profile: ' + data.message);
        }
      })
      .catch(error => alert('Something went wrong: ' + error));
  };

    const steps = {
    1: <Step1 nextStep={nextStep} formData={formData} updateForm={updateForm} />,
    2: <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} updateForm={updateForm} />,
    3: <Step3 nextStep={nextStep} prevStep={prevStep} formData={formData} updateForm={updateForm} />,
    4: <Summary formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />
  };

  return (
    <div>
      <h2>Update Profile - Step {step}</h2>
      {steps[step]}
    </div>
  );
};

export default MultiStepForm;
