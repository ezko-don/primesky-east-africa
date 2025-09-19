// Analytics and tracking utilities for Primesky East Africa

export interface WhatsAppClickEvent {
  timestamp: string;
  source: string; // 'navigation', 'floating-button', 'contact-page', 'footer'
  userAgent: string;
  referrer: string;
  sessionId: string;
  pageUrl: string;
}

export interface ContactEvent {
  type: 'whatsapp_click' | 'phone_call' | 'email_click' | 'form_submission';
  timestamp: string;
  source: string;
  details?: any;
}

// Generate unique session ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('primesky_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('primesky_session_id', sessionId);
  }
  return sessionId;
};

// Track WhatsApp click
export const trackWhatsAppClick = (source: string, additionalData?: any) => {
  const event: WhatsAppClickEvent = {
    timestamp: new Date().toISOString(),
    source,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    sessionId: getSessionId(),
    pageUrl: window.location.href
  };

  // Store in localStorage for local tracking
  const existingEvents = JSON.parse(localStorage.getItem('primesky_whatsapp_clicks') || '[]');
  existingEvents.push(event);
  localStorage.setItem('primesky_whatsapp_clicks', JSON.stringify(existingEvents));

  // Send to Google Analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      event_category: 'Contact',
      event_label: source,
      custom_parameter_1: event.sessionId
    });
  }

  // Send to Facebook Pixel if available
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {
      content_name: 'WhatsApp Click',
      content_category: source
    });
  }

  // Log to console for debugging
  console.log('WhatsApp Click Tracked:', event);

  // Send to custom analytics endpoint (if you set one up)
  sendToAnalyticsEndpoint('whatsapp_click', event);

  return event;
};

// Track other contact events
export const trackContactEvent = (type: ContactEvent['type'], source: string, details?: any) => {
  const event: ContactEvent = {
    type,
    timestamp: new Date().toISOString(),
    source,
    details
  };

  // Store locally
  const existingEvents = JSON.parse(localStorage.getItem('primesky_contact_events') || '[]');
  existingEvents.push(event);
  localStorage.setItem('primesky_contact_events', JSON.stringify(existingEvents));

  // Send to analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', type, {
      event_category: 'Contact',
      event_label: source,
      custom_parameter_1: getSessionId()
    });
  }

  console.log('Contact Event Tracked:', event);
  sendToAnalyticsEndpoint(type, event);

  return event;
};

// Send data to custom analytics endpoint
const sendToAnalyticsEndpoint = async (eventType: string, eventData: any) => {
  try {
    // Use Vercel serverless function instead of PHP
    await fetch('/api/track-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        event_data: eventData,
        website: 'primeskyeastafrica.com'
      })
    });
  } catch (error) {
    // Fail silently for analytics
    console.log('Analytics endpoint not available:', error);
  }
};

// Get analytics data for dashboard
export const getAnalyticsData = () => {
  const whatsappClicks = JSON.parse(localStorage.getItem('primesky_whatsapp_clicks') || '[]');
  const contactEvents = JSON.parse(localStorage.getItem('primesky_contact_events') || '[]');

  return {
    whatsappClicks,
    contactEvents,
    summary: {
      totalWhatsAppClicks: whatsappClicks.length,
      totalContactEvents: contactEvents.length,
      clicksBySource: whatsappClicks.reduce((acc: any, click: WhatsAppClickEvent) => {
        acc[click.source] = (acc[click.source] || 0) + 1;
        return acc;
      }, {}),
      recentClicks: whatsappClicks.slice(-10),
      sessionId: getSessionId()
    }
  };
};

// Clear analytics data (for privacy compliance)
export const clearAnalyticsData = () => {
  localStorage.removeItem('primesky_whatsapp_clicks');
  localStorage.removeItem('primesky_contact_events');
  localStorage.removeItem('primesky_session_id');
};
