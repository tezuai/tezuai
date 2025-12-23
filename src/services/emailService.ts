
// Email and SMS service for OTP delivery
export class SecureNotificationService {
  private static instance: SecureNotificationService;
  private emailEndpoint = '/api/send-email';
  private smsEndpoint = '/api/send-sms';

  public static getInstance(): SecureNotificationService {
    if (!SecureNotificationService.instance) {
      SecureNotificationService.instance = new SecureNotificationService();
    }
    return SecureNotificationService.instance;
  }

  // Generate cryptographically secure OTP using Web Crypto API
  generateOTP(length: number = 6): string {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (num) => (num % 10).toString()).join('');
  }

  // Send Email OTP
  async sendEmailOTP(email: string, userName?: string): Promise<{success: boolean, otp?: string, error?: string}> {
    try {
      const otp = this.generateOTP();
      const emailTemplate = this.createEmailTemplate(otp, userName || 'User');
      
      // In production, integrate with email service like SendGrid, Mailgun, etc.
      const response = await fetch(this.emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_EMAIL_API_KEY || 'demo-key'}`
        },
        body: JSON.stringify({
          to: email,
          subject: '🔐 Tezu AI - Secure Login Verification Code',
          html: emailTemplate,
          from: 'security@tezuai.com'
        })
      });

      if (response.ok) {
        return { success: true, otp };
      } else {
        console.error('Email service returned non-OK status');
        return { success: false, error: 'Failed to send verification code. Please try again.' };
      }
    } catch (error) {
      console.error('Email service error:', error instanceof Error ? error.message : 'Unknown error');
      return { success: false, error: 'Failed to send verification code. Please try again.' };
    }
  }

  // Send SMS OTP
  async sendSMSOTP(phone: string): Promise<{success: boolean, otp?: string, error?: string}> {
    try {
      const otp = this.generateOTP();
      const message = `🔐 Tezu AI Security Code: ${otp}\n\nThis code expires in 5 minutes. Never share this code with anyone.\n\n- Team Tezu AI`;
      
      // In production, integrate with SMS service like Twilio, AWS SNS, etc.
      const response = await fetch(this.smsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SMS_API_KEY || 'demo-key'}`
        },
        body: JSON.stringify({
          to: phone,
          message: message,
          from: 'TEZUAI'
        })
      });

      if (response.ok) {
        return { success: true, otp };
      } else {
        console.error('SMS service returned non-OK status');
        return { success: false, error: 'Failed to send verification code. Please try again.' };
      }
    } catch (error) {
      console.error('SMS service error:', error instanceof Error ? error.message : 'Unknown error');
      return { success: false, error: 'Failed to send verification code. Please try again.' };
    }
  }

  // Create professional email template
  private createEmailTemplate(otp: string, userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tezu AI - Security Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #1e293b 0%, #3730a3 100%); font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e293b 0%, #3730a3 100%); padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.95); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
                    <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 24px;">🛡️</span>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Tezu AI Security</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">World's Most Secure AI Assistant</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">Hello ${userName}! 👋</h2>
                    <p style="color: #64748b; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
                      You've requested to sign in to your Tezu AI account. For your security, please use the verification code below:
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px dashed #3b82f6; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                      <p style="color: #475569; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">🔐 YOUR SECURITY CODE</p>
                      <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: bold; color: #1e293b; letter-spacing: 8px; margin: 10px 0;">${otp}</div>
                      <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">⏰ Expires in 5 minutes</p>
                    </div>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
                      <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">🚨 Security Alert</p>
                      <p style="color: #92400e; margin: 5px 0 0 0; font-size: 13px;">
                        Never share this code with anyone. Tezu AI will never ask for your verification code via phone, email, or any other method.
                      </p>
                    </div>
                    
                    <p style="color: #64748b; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                      If you didn't request this verification code, please ignore this email and ensure your account is secure.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                    <div style="text-align: center; margin-bottom: 15px;">
                      <span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin: 0 5px;">🔒 100% SECURE</span>
                      <span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin: 0 5px;">🇮🇳 MADE IN INDIA</span>
                      <span style="background: #8b5cf6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin: 0 5px;">🏆 #1 AI ASSISTANT</span>
                    </div>
                    <p style="color: #64748b; text-align: center; margin: 0; font-size: 12px;">
                      © 2024 Tezu AI - Advanced AI Assistant Platform<br>
                      🛡️ Bank-grade security • 🔐 End-to-end encryption • 📱 Multi-factor authentication
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  // Verify OTP
  verifyOTP(userOTP: string, actualOTP: string): boolean {
    return userOTP === actualOTP;
  }

  // Anti-fraud checks
  checkSecurityThreats(ip: string, email: string): {safe: boolean, reason?: string} {
    // In production, implement real fraud detection
    const blockedIPs = ['127.0.0.1']; // Demo blocked IPs
    const suspiciousEmails = ['test@hack.com']; // Demo suspicious emails
    
    if (blockedIPs.includes(ip)) {
      return { safe: false, reason: 'IP blocked for security reasons' };
    }
    
    if (suspiciousEmails.includes(email)) {
      return { safe: false, reason: 'Email flagged as suspicious' };
    }
    
    return { safe: true };
  }
}

// Export singleton instance
export const notificationService = SecureNotificationService.getInstance();
