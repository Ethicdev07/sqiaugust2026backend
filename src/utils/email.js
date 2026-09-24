const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || process.env.EMAIL || "Shopsy <onboarding@resend.dev>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    });

    if (error) {
        throw new Error(error.message || "Failed to send email");
    }
};

module.exports = sendEmail;