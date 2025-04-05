export interface Email {
    id: number;
    to: string;
    subject: string;
    body: string;
    sent: boolean;
    sent_at: Date | null;
    created_at: Date;
    updated_at: Date | null;
}