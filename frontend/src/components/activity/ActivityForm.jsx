// src/components/activity/ActivityForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logActivity, selectLogStatus, resetLogStatus } from '../../store/activitySlice';
import { showToast } from '../../store/uiSlice';
import { ACTIVITY_TYPES } from '../../utils/constants';
import { formatActivityType } from '../../utils/activityUtils';
import Button from '../common/Button';


const ActivityForm = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const logStatus  = useSelector(selectLogStatus);

  const [form, setForm] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.type)                              errs.type = 'Please select an activity type.';
    if (!form.duration || form.duration <= 0)    errs.duration = 'Duration must be greater than 0.';
    if (form.duration > 600)                     errs.duration = 'Duration must be ≤ 600 minutes.';
    if (form.caloriesBurned < 0)                 errs.caloriesBurned = 'Calories cannot be negative.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    dispatch(logActivity({
      type:           form.type,
      duration:       parseInt(form.duration, 10),
      caloriesBurned: form.caloriesBurned ? parseInt(form.caloriesBurned, 10) : 0,
      startTime:      new Date().toISOString(),
      additionalMetrics: form.notes ? { notes: form.notes } : {},
    }));
  };

  useEffect(() => {
    if (logStatus === 'succeeded') {
      dispatch(showToast({ message: 'Activity logged! AI analysis in progress... 🤖', type: 'success' }));
      dispatch(resetLogStatus());
      navigate('/activities');
    }
    if (logStatus === 'failed') {
      dispatch(showToast({ message: 'Failed to log activity. Please try again.', type: 'error' }));
    }
  }, [logStatus, dispatch, navigate]);

  const isLoading = logStatus === 'loading';

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    background: hasError ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'var(--border-light)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 150ms ease',
    boxSizing: 'border-box',
  });

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="log-activity-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      noValidate
    >
      {/* Activity Type */}
      <div className="form-group">
        <label className="form-label" htmlFor="activity-type">Activity Type *</label>
        <select
          id="activity-type"
          name="type"
          value={form.type}
          onChange={handleChange}
          data-testid="activity-type"
          required
          style={{
            ...inputStyle(!!errors.type),
            appearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem',
            paddingRight: '2.5rem',
            cursor: 'pointer',
          }}
        >
          {ACTIVITY_TYPES.map((t) => (
            <option key={t} value={t} style={{ background: 'var(--bg-tertiary)' }}>
              {formatActivityType(t)}
            </option>
          ))}
        </select>
        {errors.type && <span className="form-error">⚠ {errors.type}</span>}
      </div>

      {/* Duration & Calories row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="duration-input">Duration (minutes) *</label>
          <input
            id="duration-input"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            data-testid="duration-input"
            placeholder="e.g. 30"
            min="1"
            max="600"
            required
            style={inputStyle(!!errors.duration)}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.15)'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.duration ? 'rgba(239,68,68,0.5)' : 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.duration && <span className="form-error">⚠ {errors.duration}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="calories-input">Calories Burned</label>
          <input
            id="calories-input"
            name="caloriesBurned"
            type="number"
            value={form.caloriesBurned}
            onChange={handleChange}
            data-testid="calories-input"
            placeholder="e.g. 300"
            min="0"
            style={inputStyle(!!errors.caloriesBurned)}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.15)'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.caloriesBurned ? 'rgba(239,68,68,0.5)' : 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.caloriesBurned && <span className="form-error">⚠ {errors.caloriesBurned}</span>}
        </div>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label className="form-label" htmlFor="notes-input">Notes (optional)</label>
        <textarea
          id="notes-input"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="How did it go? Any observations..."
          rows={3}
          style={{
            ...inputStyle(false),
            resize: 'vertical',
            minHeight: 80,
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.15)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        fullWidth
        data-testid="submit-activity"
      >
        {isLoading ? 'Logging...' : '✓ Log Activity'}
      </Button>
    </form>
  );
};

export default ActivityForm;
