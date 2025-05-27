export declare class MaillingService {
    private readonly SERVICE_NAME;
    private readonly logger;
    sendOTP(username: string, email: string, otp: number, local: string): Promise<void>;
}
