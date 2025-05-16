import React, { useState, useEffect } from 'react';
import './Step1.css';
import { API } from '../utils/contants';

const Step1 = ({ formData, updateForm, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [usernameStatus, setUsernameStatus] = useState('');
  const [profilePreview, setProfilePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const maxDOB = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const delay = setTimeout(() => {
      if (formData.username.length >= 4) {
        fetch(`${API}/check-username/${formData.username}`)
          .then(res => res.json())
          .then(data => {
            setUsernameStatus(data.available ? '✅ Available' : '❌ Taken');
          });
      } else {
        setUsernameStatus('');
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [formData.username]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && fileSize <= 2) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        updateForm({ profilePhoto: file });
      };
      reader.readAsDataURL(file);
    } else {
      setErrors(prev => ({
        ...prev,
        profilePhoto: 'Only JPG/PNG files under 2MB are allowed.'
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.username || formData.username.length < 4) {
      errs.username = "Username must be at least 4 characters";
    }
    if (!formData.currentPassword && formData.newPassword) {
      errs.currentPassword = "Password is required";
    }
    if (!formData.newPassword || formData.newPassword.length < 8) {
      errs.newPassword = "Password must be at least 8 characters";
    }
    if (!imageFile) {
      errs.profilePhoto = "Profile photo is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const passwordStrength = () => {
    const { newPassword } = formData;
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[!@#$%^&*]/.test(newPassword)) strength++;
    if (/\d/.test(newPassword)) strength++;
    return strength;
  };

  const strengthText = ["Weak", "Medium", "Strong"];
  const strength = passwordStrength();

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="step-container">
      <h3 className="step-title">Step 1: Personal Info</h3>

      <div>
        <label>Username</label><br />
        <input
          type="text"
          value={formData.username}
          onChange={e => updateForm({ username: e.target.value })}
          className="input-style"
        />
        {errors.username && <div className="error-style">{errors.username}</div>}
        {usernameStatus && <div>{usernameStatus}</div>}
      </div>

      <div>
        <label>Gender</label><br />
        <select
          value={formData.gender || ""}
          onChange={e => updateForm({ gender: e.target.value, customGender: "" })}
          className="input-style"
        >
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {formData.gender === "Other" && (
          <input
            type="text"
            placeholder="Please specify"
            value={formData.customGender || ""}
            onChange={e => updateForm({ customGender: e.target.value })}
            className="input-style"
          />
        )}
      </div>

      <div>
        <label>Date of Birth</label><br />
        <input
          type="date"
          max={maxDOB}
          value={formData.dob || ""}
          onChange={e => updateForm({ dob: e.target.value })}
          className="input-style"
        />
      </div>

      <div>
        <label>Current Password</label><br />
        <input
          type="password"
          value={formData.currentPassword}
          onChange={e => updateForm({ currentPassword: e.target.value })}
          className="input-style"
        />
        {errors.currentPassword && <div className="error-style">{errors.currentPassword}</div>}
      </div>

      <div>
        <label>New Password</label><br />
        <input
          type="password"
          value={formData.newPassword}
          onChange={e => updateForm({ newPassword: e.target.value })}
          className="input-style"
        />
        {errors.newPassword && <div className="error-style">{errors.newPassword}</div>}
        <div style={{ fontSize: '14px', marginTop: '5px' }}>
          Strength: <strong>{formData.newPassword ? strengthText[strength - 1] || "Weak" : ""}</strong>
          <progress value={strength} max="3" style={{ width: '100%', marginTop: '5px' }} />
        </div>
      </div>

      <div>
        <label>Profile Photo</label><br />
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="input-style"
        />
        {errors.profilePhoto && <div className="error-style">{errors.profilePhoto}</div>}
        {profilePreview && (
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="preview-img"
          />
        )}
      </div>

      <button onClick={handleNext} className="next-button">Next</button>
    </div>
  );
};

export default Step1;
