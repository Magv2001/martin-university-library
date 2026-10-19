import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
    email,
    subject,
    message,
}: {
    email: string;
    subject: string;
    message: string;
}) => {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            service_id: config.env.emailjs.serviceId,
            template_id: config.env.emailjs.templateId,
            user_id: config.env.emailjs.publicKey,
            accessToken: config.env.emailjs.privateKey,
            template_params: { to_email: email, subject, message },
        }),
    });

    if (!res.ok) {
        throw new Error(`EmailJS error: ${res.status} ${await res.text()}`);
    }
};