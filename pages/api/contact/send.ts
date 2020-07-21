import sgMail from "@sendgrid/mail";

export default async function(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const { name, email, subject, message, sticky } = req.body;

  const emailToSupport = {
    to: process.env.SENDGRID_TO_ADDRESS || "",
    from: {
      email: process.env.SENDGRID_FROM_ADDRESS || "", // Needs to be a verified email address or domain.
      name
    },
    replyTo: email,
    subject,
    text: message,
    html: `<p>${message}</p>`
  };

  const emailConfirmation = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_ADDRESS || "", // Needs to be a verified email address or domain (so we can't use the customer's email for this).
      name: "RecordRig"
    },
    replyTo: process.env.SENDGRID_FROM_ADDRESS,
    subject: `Your message to RecordRig ("${subject}")`,
    text: `Hi ${name}. You recently contacted RecordRig through the contact form. We should be able to get back to you within a couple of days. Here's a copy of your message: "${message}"`,
    html: `<p>Hi ${name},</p>
      <p>You recently contacted RecordRig through the contact form. We should be able to get back to you within a couple of days. Here's a copy of your email:</p>
      <p>---</p>
      <p>Subject: <strong>${subject}</strong></p>
      <p>${message}</p>
      <p>---</p>
      <p>Speak soon,</p>
      <p>RecordRig.</p>
    `
  };

  try {
    if (sticky.length > 0) throw Error;
    await sgMail.send(emailToSupport);
    await sgMail.send(emailConfirmation);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.status(400).send("Message not sent", error);
  }
}
