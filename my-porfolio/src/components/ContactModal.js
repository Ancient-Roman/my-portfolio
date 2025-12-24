import React from 'react';
import emailjs from '@emailjs/browser';
import useFormValidation from '../hooks/useFormValidation';

function ContactModal({ isOpen, onClose }) {
  const [submitStatus, setSubmitStatus] = React.useState(null); // 'success', 'error', or null

  /** Contact me validation function */
  const validate = (values) => {
    const newErrors = {};
    
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!values.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldError,
    hasFieldError,
  } = useFormValidation(
    { name: '', email: '', message: '' },
    validate
  );

  // Initialize EmailJS on component mount
  React.useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  // Handle form submission
  const onSubmit = async (formValues) => {
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const recipientEmail = process.env.REACT_APP_CONTACT_EMAIL;

      if (!serviceId || !templateId || !recipientEmail) {
        throw new Error('EmailJS not configured. Please check your .env.local file.');
      }

      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, {
        from_name: formValues.name,
        from_email: formValues.email,
        to_email: recipientEmail,
        message: formValues.message,
      });

      if (response.status === 200) {
        setSubmitStatus('success');
        resetForm();
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  const handleBackdropClick = (e) => {
    // Close modal only if clicking outside the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md flex flex-col max-h-[90vh]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", backgroundColor: 'rgb(199, 224, 189)' }}>
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 sm:p-8 border-b-2" style={{ borderColor: 'rgb(56, 87, 35)' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", color: 'rgb(56, 87, 35)' }}>
              Get In Touch
            </h2>
            <button
              onClick={onClose}
              className="text-2xl transition-colors"
              style={{ color: 'rgb(56, 87, 35)' }}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitStatus === 'success' && (
            <div className="mb-4 p-4 rounded" style={{ backgroundColor: 'rgb(199, 224, 189)', color: 'rgb(56, 87, 35)' }}>
              Message sent successfully! Thanks for reaching out.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error sending message. Please try again later or raise an issue on github if the issue persists.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Name {hasFieldError('name') && <span className="text-red-600">*</span>}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors text-black placeholder-gray-500 ${
                hasFieldError('name') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {getFieldError('name') && (
              <p className="text-red-600 text-sm mt-1">{getFieldError('name')}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Email {hasFieldError('email') && <span className="text-red-600">*</span>}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors text-black placeholder-gray-500 ${
                hasFieldError('email') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {getFieldError('email') && (
              <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Message {hasFieldError('message') && <span className="text-red-600">*</span>}
            </label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your message here..."
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none text-black placeholder-gray-500 ${
                hasFieldError('message') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {getFieldError('message') && (
              <p className="text-red-600 text-sm mt-1">{getFieldError('message')}</p>
            )}
          </div>

          {/* Buttons - Fixed at bottom */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgb(56, 87, 35)', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = 'rgb(35, 55, 20)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgb(56, 87, 35)')}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
