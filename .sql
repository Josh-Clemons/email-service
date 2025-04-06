CREATE TABLE email (
    id SERIAL PRIMARY KEY,
    email_to TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- test data insert
INSERT INTO email (email_to, subject, body)
VALUES('test@test.com', 'Test Email Subject', 'Body of the test email');