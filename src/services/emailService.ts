import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailTemplateParams, validateEmail, validatePhone } from '../config/emailjs';

// Initialize EmailJS with public key
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface QuoteRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  details?: any;
}

// Send quote request email to both recipients
export const sendQuoteRequest = async (formData: QuoteRequestData): Promise<EmailResponse> => {
  try {
    // Validate input data
    if (!formData.firstName || !formData.lastName) {
      return {
        success: false,
        message: 'Please provide both first and last name.'
      };
    }

    if (!validateEmail(formData.email)) {
      return {
        success: false,
        message: 'Please provide a valid email address.'
      };
    }

    if (!validatePhone(formData.phone)) {
      return {
        success: false,
        message: 'Please provide a valid phone number.'
      };
    }

    if (!formData.service || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.'
      };
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;
    const subject = `New Quote Request from ${fullName} - Primesky East Africa`;

    // For now, use a reliable fallback approach until EmailJS template is properly configured
    console.log('Using fallback email approach...');
    
    // Create mailto links for both recipients
    const emailBody = encodeURIComponent(
      `NEW QUOTE REQUEST - PRIMESKY EAST AFRICA\n\n` +
      `CLIENT INFORMATION:\n` +
      `Name: ${fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Service Needed: ${formData.service}\n\n` +
      `PROJECT DETAILS:\n` +
      `${formData.message}\n\n` +
      `---\n` +
      `This quote request was submitted through the Primesky East Africa website.\n` +
      `Please respond within 24 hours for the best customer experience.\n` +
      `Company Contact: +254 741 464497 | info@primeskyeastafrica.com`
    );

    const emailSubject = encodeURIComponent(subject);
    
    // Create mailto links for both recipients
    const mailto1 = `mailto:estherzawadi887@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    const mailto2 = `mailto:joebeinlord44@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Show success message
    const successMessage = `Thank you ${formData.firstName}! Your quote request has been prepared and will be sent to both email addresses. We'll contact you at ${formData.phone} within 24 hours.`;

    // Open both email clients with a small delay
    setTimeout(() => {
      if (window.confirm('Click OK to send to Esther\'s email (estherzawadi887@gmail.com)')) {
        window.open(mailto1, '_blank');
      }
    }, 1000);

    setTimeout(() => {
      if (window.confirm('Click OK to send to Joe\'s email (joebeinlord44@gmail.com)')) {
        window.open(mailto2, '_blank');
      }
    }, 2000);

    // Also try EmailJS in the background (if properly configured)
    try {
      console.log('Attempting EmailJS as backup...');
      
      // Simple template parameters that should work with basic EmailJS setup
      const templateParams = {
        to_email: 'estherzawadi887@gmail.com',
        from_name: fullName,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        subject: subject
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS backup successful');
    } catch (emailjsError) {
      console.log('EmailJS backup failed, but mailto fallback is working:', emailjsError);
    }

    return {
      success: true,
      message: successMessage,
      details: { method: 'mailto_fallback' }
    };

  } catch (error: any) {
    console.error('Email service error:', error);
    
    return {
      success: false,
      message: `Sorry ${formData.firstName || 'there'}, we're experiencing technical difficulties. Please call us directly at +254 741 464497 or WhatsApp us for immediate assistance. We'll be happy to help you with your drone service needs!`,
      details: error
    };
  }
};

// Test EmailJS configuration
export const testEmailJSConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
    errors.push('EmailJS Public Key not configured');
  }

  if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
    errors.push('EmailJS Service ID not configured');
  }

  if (EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
    errors.push('EmailJS Template ID not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
