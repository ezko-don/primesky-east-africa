// Vercel serverless function for analytics tracking
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      // Store analytics event
      const { event_type, event_data, website } = req.body;

      if (!event_type) {
        return res.status(400).json({
          success: false,
          error: 'Missing event_type'
        });
      }

      const analyticsEntry = {
        timestamp: new Date().toISOString(),
        event_type,
        event_data: event_data || {},
        website: website || 'primeskyeastafrica.com',
        ip_address: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown'
      };

      // Store in Vercel KV (Redis)
      const today = new Date().toISOString().split('T')[0];
      const eventKey = `analytics:${today}`;
      const summaryKey = 'analytics:summary';

      // Add to today's events
      await kv.lpush(eventKey, JSON.stringify(analyticsEntry));
      await kv.expire(eventKey, 86400 * 30); // Keep for 30 days

      // Update summary
      const summary = await kv.get(summaryKey) || {
        total_events: 0,
        events_by_type: {},
        events_by_date: {},
        last_updated: null
      };

      summary.total_events++;
      summary.events_by_type[event_type] = (summary.events_by_type[event_type] || 0) + 1;
      summary.events_by_date[today] = (summary.events_by_date[today] || 0) + 1;
      summary.last_updated = new Date().toISOString();

      await kv.set(summaryKey, summary);

      return res.status(200).json({
        success: true,
        message: 'Analytics event recorded',
        event_type
      });

    } else if (req.method === 'GET') {
      // Retrieve analytics data
      const today = new Date().toISOString().split('T')[0];
      const eventKey = `analytics:${today}`;
      const summaryKey = 'analytics:summary';

      const summary = await kv.get(summaryKey) || {};
      const todayEventsRaw = await kv.lrange(eventKey, 0, -1) || [];
      
      const todayEvents = todayEventsRaw.map(event => {
        try {
          return JSON.parse(event);
        } catch {
          return null;
        }
      }).filter(Boolean);

      // Get recent WhatsApp clicks
      const recentWhatsAppClicks = todayEvents
        .filter(event => event.event_type === 'whatsapp_click')
        .slice(-10);

      // Get clicks by source
      const clicksBySource = {};
      recentWhatsAppClicks.forEach(click => {
        const source = click.event_data?.source || 'unknown';
        clicksBySource[source] = (clicksBySource[source] || 0) + 1;
      });

      return res.status(200).json({
        success: true,
        summary,
        today_events: todayEvents.length,
        recent_whatsapp_clicks: recentWhatsAppClicks,
        clicks_by_source: clicksBySource,
        date: today
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
