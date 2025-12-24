import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation and state management
 * Handles form values, errors, and touched fields
 * 
 * @param {Object} initialValues - Initial form values (e.g., { name: '', email: '' })
 * @param {Function} validationFn - Function that returns validation errors
 * @returns {Object} Form state and handlers
 */
export const useFormValidation = (initialValues, validationFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate all fields
   */
  const validate = useCallback(() => {
    const validationErrors = validationFn(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validationFn]);

  /**
   * Handle input change
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  /**
   * Handle blur - mark field as touched
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate this specific field
    const validationErrors = validationFn(values);
    if (validationErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name],
      }));
    }
  }, [values, validationFn]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Mark all fields as touched
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Validate all fields
      if (validate()) {
        try {
          await onSubmit(values);
          // Reset form after successful submission
          setValues(initialValues);
          setTouched({});
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setIsSubmitting(false);
    },
    [initialValues, validate, values]
  );

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * Get error message for a field (only show if field is touched)
   */
  const getFieldError = useCallback(
    (fieldName) => {
      return touched[fieldName] ? errors[fieldName] : '';
    },
    [touched, errors]
  );

  /**
   * Check if a field has an error and is touched
   */
  const hasFieldError = useCallback(
    (fieldName) => {
      return touched[fieldName] && !!errors[fieldName];
    },
    [touched, errors]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldError,
    hasFieldError,
    setValues,
    setErrors,
    setTouched,
  };
};

export default useFormValidation;
