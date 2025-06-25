import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const data = req.body;

  try {
    const emailResponse = await resend.emails.send({
      from: 'Travel With Sohaib <onboarding@resend.dev>',
      to: 'yourgmail@gmail.com', // 🔁 Replace with your Gmail
      subject: 'New Travel Quote Request',
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Destination:</strong> ${data.destination}</p>
        <p><strong>Budget:</strong> $${data.budget}</p>
        <p><strong>Travelers:</strong> ${data.travelers}</p>
        <p><strong>Dates:</strong> ${data.startDate} to ${data.endDate}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    });

    console.log(emailResponse);
    return res.status(200).json({ message: 'Form submitted and email sent!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
