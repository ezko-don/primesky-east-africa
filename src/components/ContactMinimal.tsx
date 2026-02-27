import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactMinimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Create mailto links for both email addresses
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      );

      // Send to both email addresses
      const email1 = `mailto:primeskyeastafrica@yahoo.com?subject=${subject}&body=${body}`;
      const email2 = `mailto:estherzawadi887@gmail.com?subject=${subject}&body=${body}`;

      window.open(email1, '_blank');
      setTimeout(() => {
        window.open(email2, '_blank');
      }, 500);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-12 tracking-tight">
              Get in Touch
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-neutral-600 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-neutral-900 mb-2">Email</p>
                  <a href="mailto:primeskyeastafrica@yahoo.com" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    primeskyeastafrica@yahoo.com
                  </a>
                  <br />
                  <a href="mailto:estherzawadi887@gmail.com" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    estherzawadi887@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-neutral-600 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-neutral-900 mb-2">Phone</p>
                  <a href="tel:+254712345678" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    +254 712 345 678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-neutral-600 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-neutral-900 mb-2">Location</p>
                  <p className="text-neutral-600">
                    Nairobi, Kenya<br />
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none transition-colors text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none transition-colors text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none transition-colors text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none transition-colors text-neutral-900 placeholder:text-neutral-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-900 hover:text-neutral-600 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {status === 'error' && (
                <p className="text-sm text-red-600">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMinimal;
