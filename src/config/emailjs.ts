// EmailJS Configuration for Primesky East Africa
// This file contains the configuration for sending emails through EmailJS service

export const EMAILJS_CONFIG = {
  // These are public keys - they're safe to include in frontend code
  PUBLIC_KEY: 'vFJrPk5hJmVUz54o1', // Your EmailJS public key from the dashboard
  SERVICE_ID: 'service_kz67pi3', // Replace with your EmailJS service ID (you'll get this when you add an email service)
  TEMPLATE_ID: 'template_m05clx2', // Replace with your EmailJS template ID (you'll get this when you create a template)
  
  // Email recipients
  RECIPIENTS: [
    'estherzawadi887@gmail.com',
    'joebeinlord44@gmail.com'
  ],
  
  // Company information
  COMPANY: {
    name: 'Primesky East Africa',
    phone: '+254 741 464497',
    email: 'info@primeskyeastafrica.com',
    website: 'https://primeskyeastafrica.com'
  }
};

// Template parameters structure for EmailJS
export interface EmailTemplateParams {
  to_email: string;
  to_name: string;
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
  company_name: string;
  company_phone: string;
  company_email: string;
  reply_to: string;
  subject: string;
}

// Email validation utility
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation utility
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};
