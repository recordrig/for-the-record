import sgMail from "@sendgrid/mail";

export default async function(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const { name, email, subject, message } = req.body;

  const content = {
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

  try {
    await sgMail.send(content);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.status(400).send("Message not sent", error);
  }
}
