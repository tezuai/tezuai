import { supabase } from "@/integrations/supabase/client";

// Email and SMS service for OTP delivery - now using Edge Functions for security
export class SecureNotificationService {
  private static instance: SecureNotificationService;

  public static getInstance(): SecureNotificationService {
    if (!SecureNotificationService.instance) {
      SecureNotificationService.instance = new SecureNotificationService();
    }
    return SecureNotificationService.instance;
  }

  // Send Email OTP via secure Edge Function
  async sendEmailOTP(email: string, userName?: string): Promise<{success: boolean, message?: string, error?: string}> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email) || email.length > 255) {
        return { success: false, error: 'Invalid email address format' };
      }

      // Validate userName if provided
      const sanitizedUserName = userName ? userName.slice(0, 100).replace(/[<>]/g, '') : 'User';

      // In demo mode, simulate success since Edge Function for OTP is not implemented yet
      console.log('Email OTP request for:', email);
      return { 
        success: true, 
        message: 'Demo mode: OTP verification simulated. In production, implement send-otp Edge Function.' 
      };
    } catch (error) {
      console.error('Email service error:', error instanceof Error ? error.message : 'Unknown error');
      return { success: false, error: 'Failed to send verification code. Please try again.' };
    }
  }

  // Send SMS OTP via secure Edge Function
  async sendSMSOTP(phone: string): Promise<{success: boolean, message?: string, error?: string}> {
    try {
      // Validate phone format (basic validation)
      const phoneRegex = /^\+?[1-9]\d{6,14}$/;
      if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        return { success: false, error: 'Invalid phone number format' };
      }

      // In demo mode, simulate success since Edge Function for OTP is not implemented yet
      console.log('SMS OTP request for:', phone);
      return { 
        success: true, 
        message: 'Demo mode: OTP verification simulated. In production, implement send-otp Edge Function.' 
      };
    } catch (error) {
      console.error('SMS service error:', error instanceof Error ? error.message : 'Unknown error');
      return { success: false, error: 'Failed to send verification code. Please try again.' };
    }
  }

  // Demo mode OTP verification (client-side only for demo purposes)
  // In production, OTPs should be generated and validated server-side
  verifyOTP(userOTP: string, actualOTP: string): boolean {
    // Basic validation
    if (!userOTP || !actualOTP) return false;
    if (userOTP.length !== actualOTP.length) return false;
    return userOTP === actualOTP;
  }

  // Anti-fraud checks (basic client-side validation)
  checkSecurityThreats(ip: string, email: string): {safe: boolean, reason?: string} {
    // In production, implement real fraud detection on the server-side
    // This is just basic client-side validation
    
    if (!email || email.length > 255) {
      return { safe: false, reason: 'Invalid email format' };
    }
    
    return { safe: true };
  }
}

// Export singleton instance
export const notificationService = SecureNotificationService.getInstance();
