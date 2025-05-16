import React, { useEffect, useState } from 'react';

const Summary = ({ formData, prevStep, handleSubmit }) => {
   const [previewImage , setProfilePreview] = useState(null);
  useEffect(()=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);  
      };
      reader.readAsDataURL(formData.profilePhoto);
  },[])

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Summary</h3>

      <div style={{ marginBottom: '15px' }}>
        <p><strong>Profile:</strong> <img src={previewImage} alt="not found" /></p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Username:</strong> {formData.username}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Gender:</strong> {formData.customGender || formData.gender}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>DOB:</strong> {formData.dob}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Profession:</strong> {formData.profession}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Company Name:</strong> {formData.companyName}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Address:</strong> {formData.addressLine1}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Country:</strong> {formData.country}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>State:</strong> {formData.state}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>City:</strong> {formData.city}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Subscription Plan:</strong> {formData.subscriptionPlan}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Newsletter:</strong> {formData.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={prevStep}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginRight: '10px'
          }}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;
