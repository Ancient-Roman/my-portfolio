import React from 'react';
import emailjs from '@emailjs/browser';

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null); // 'success', 'error', or null

  // Initialize EmailJS on component mount
  React.useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const recipientEmail = process.env.REACT_APP_CONTACT_EMAIL;

      if (!serviceId || !templateId || !recipientEmail) {
        throw new Error('EmailJS not configured. Please check your .env.local file.');
      }

      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        to_email: recipientEmail,
        message: formData.message,
      });

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
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
    } finally {
      setIsSubmitting(false);
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
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1"
              style={{ color: 'rgb(56, 87, 35)' }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-black placeholder-gray-500"
            />
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
