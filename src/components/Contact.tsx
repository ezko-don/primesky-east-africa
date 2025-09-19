import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { trackWhatsAppClick, trackContactEvent } from '../utils/analytics';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact-page', {
      section: 'contact-info'
    });
  };

  const handlePhoneClick = () => {
    trackContactEvent('phone_call', 'contact-page', {
      phoneNumber: '+254741464497',
      section: 'contact-info'
    });
  };

  const handleEmailClick = () => {
    trackContactEvent('email_click', 'contact-page', {
      email: 'info@primeskyeastafrica.com',
      section: 'contact-info'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Sending quote request to both email addresses...');
      
      // Use Netlify Forms as primary method (more reliable)
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact');
      netlifyFormData.append('name', `${formData.firstName} ${formData.lastName}`);
      netlifyFormData.append('email', formData.email);
      netlifyFormData.append('phone', formData.phone);
      netlifyFormData.append('service', formData.service);
      netlifyFormData.append('message', formData.message);
      netlifyFormData.append('company', 'Primesky East Africa');
      netlifyFormData.append('timestamp', new Date().toISOString());

      // Try multiple email services for reliability
      const emailPromises = [];

      // Method 1: FormSubmit with hash to avoid spam detection
      const formSubmitData = new FormData();
      const timestamp = Date.now();
      formSubmitData.append('_subject', `Quote Request #${timestamp} from ${formData.firstName} ${formData.lastName} - Primesky East Africa`);
      formSubmitData.append('_template', 'table');
      formSubmitData.append('_captcha', 'false');
      formSubmitData.append('_next', `https://primeskyeastafrica.com/thank-you?t=${timestamp}`);
      formSubmitData.append('_replyto', formData.email);
      
      // Add unique identifier to prevent spam detection
      formSubmitData.append('submission_id', `PEA-${timestamp}-${Math.random().toString(36).substr(2, 9)}`);
      formSubmitData.append('Client_Name', `${formData.firstName} ${formData.lastName}`);
      formSubmitData.append('Email_Address', formData.email);
      formSubmitData.append('Phone_Number', formData.phone);
      formSubmitData.append('Service_Requested', formData.service);
      formSubmitData.append('Project_Details', formData.message);
      formSubmitData.append('Submission_Time', new Date().toLocaleString());
      formSubmitData.append('Company', 'Primesky East Africa');
      formSubmitData.append('Company_Phone', '+254 741 464497');
      formSubmitData.append('Company_Email', 'info@primeskyeastafrica.com');

      // Send to both emails with slight delay to avoid rate limiting
      emailPromises.push(
        fetch('https://formsubmit.co/estherzawadi887@gmail.com', {
          method: 'POST',
          body: formSubmitData
        })
      );

      // Wait 1 second before sending to second email
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create second form data with different submission ID
      const formSubmitData2 = new FormData();
      const timestamp2 = Date.now();
      formSubmitData2.append('_subject', `Quote Request #${timestamp2} from ${formData.firstName} ${formData.lastName} - Primesky East Africa`);
      formSubmitData2.append('_template', 'table');
      formSubmitData2.append('_captcha', 'false');
      formSubmitData2.append('_next', `https://primeskyeastafrica.com/thank-you?t=${timestamp2}`);
      formSubmitData2.append('_replyto', formData.email);
      
      formSubmitData2.append('submission_id', `PEA-${timestamp2}-${Math.random().toString(36).substr(2, 9)}`);
      formSubmitData2.append('Client_Name', `${formData.firstName} ${formData.lastName}`);
      formSubmitData2.append('Email_Address', formData.email);
      formSubmitData2.append('Phone_Number', formData.phone);
      formSubmitData2.append('Service_Requested', formData.service);
      formSubmitData2.append('Project_Details', formData.message);
      formSubmitData2.append('Submission_Time', new Date().toLocaleString());
      formSubmitData2.append('Company', 'Primesky East Africa');
      formSubmitData2.append('Company_Phone', '+254 741 464497');
      formSubmitData2.append('Company_Email', 'info@primeskyeastafrica.com');

      emailPromises.push(
        fetch('https://formsubmit.co/joebeinlord44@gmail.com', {
          method: 'POST',
          body: formSubmitData2
        })
      );

      console.log('Sending to both email addresses...');
      const responses = await Promise.allSettled(emailPromises);

      console.log('Email responses:', responses);

      // Check if at least one email was sent successfully
      const successfulSends = responses.filter(response => 
        response.status === 'fulfilled' && response.value.ok
      );

      if (successfulSends.length > 0) {
        setSubmitStatus('success');
        setStatusMessage(
          `Thank you ${formData.firstName}! Your quote request has been sent successfully to ${successfulSends.length} email address(es). ` +
          `We'll contact you at ${formData.phone} within 24 hours.`
        );
        
        // Clear form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });

        // Also create a backup mailto link as fallback
        const emailSubject = `Quote Request from ${formData.firstName} ${formData.lastName} - Primesky East Africa`;
        const emailBody = `NEW QUOTE REQUEST - PRIMESKY EAST AFRICA

CLIENT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}

PROJECT DETAILS:
${formData.message}

Submitted: ${new Date().toLocaleString()}
Company: +254 741 464497 | info@primeskyeastafrica.com`;

        // Store backup in localStorage for manual sending if needed
        localStorage.setItem('lastQuoteRequest', JSON.stringify({
          subject: emailSubject,
          body: emailBody,
          timestamp: new Date().toISOString(),
          recipients: ['estherzawadi887@gmail.com', 'joebeinlord44@gmail.com']
        }));

      } else {
        throw new Error('Failed to send to any email addresses');
      }

    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage(
        `Sorry ${formData.firstName || 'there'}, we're experiencing technical difficulties. ` +
        `Please call us directly at +254 741 464497 or WhatsApp us for immediate assistance. ` +
        `We'll be happy to help you with your drone service needs!`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Send className="w-8 h-8 md:w-12 md:h-12 text-emerald-400" />
              <div className="h-px w-8 md:w-16 bg-emerald-400"></div>
              <span className="text-emerald-400 font-light tracking-widest text-xs md:text-sm">GET IN TOUCH</span>
              <div className="h-px w-8 md:w-16 bg-emerald-400"></div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-white mb-4 md:mb-6">
            CONTACT <span className="text-emerald-400">US</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto px-4">
            Ready to capture your vision from above? Get in touch for a free consultation and quote.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-6 md:mb-8">
                Get In Touch
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-emerald-400/50 transition-all duration-300">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 flex-shrink-0" />
                  <a 
                    href="tel:+254741464497" 
                    onClick={handlePhoneClick}
                    className="text-white/90 font-light text-sm md:text-base"
                  >
                    +254 741 464497
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-emerald-400/50 transition-all duration-300">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 flex-shrink-0" />
                  <a 
                    href="mailto:info@primeskyeastafrica.com" 
                    onClick={handleEmailClick}
                    className="text-white/90 font-light text-sm md:text-base break-all"
                  >
                    info@primeskyeastafrica.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-emerald-400/50 transition-all duration-300">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-white/90 font-light text-sm md:text-base">Nairobi, Kenya</span>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-emerald-400/50 transition-all duration-300">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 flex-shrink-0" />
                  <a 
                    href="https://wa.me/254741464497" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="text-white/90 font-light hover:text-emerald-400 transition-colors text-sm md:text-base"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800/30 border border-neutral-700 rounded-2xl p-4 md:p-8">
              <h4 className="text-lg md:text-xl font-light tracking-wide text-white mb-3 md:mb-4">
                Service Areas
              </h4>
              <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                We provide drone services across Kenya including Nairobi, Mombasa, Kisumu, 
                Nakuru, Eldoret, and surrounding regions. Remote locations available upon request.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-6 md:mb-8">
              Request Quote
            </h3>
            
            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-xl flex items-start gap-3 ${
                submitStatus === 'success' 
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-xs md:text-sm leading-relaxed">{statusMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name" 
                  required
                  className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
                />
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name" 
                  required
                  className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
                />
              </div>
              
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
              />
              
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number" 
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
              />
              
              <input 
                type="text"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                placeholder="Service Needed" 
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
              />
              
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Project Details & Requirements" 
                rows={4}
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-white/50 font-light resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm md:text-base"
              />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-sm md:text-base ${
                  isSubmitting 
                    ? 'bg-neutral-600 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-20">
          <div className="bg-neutral-800/30 border border-neutral-700 rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-3 md:mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-white/70 mb-6 md:mb-8 text-base md:text-lg px-4">
              Professional drone services with licensed pilots and premium equipment
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25 text-sm md:text-base">
                Call Now: +254 741 464497
              </button>
              <button className="border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;