import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const data = req.body;

  try {
    // 1️⃣ Send Email (existing)
    const emailResponse = await resend.sendEmail({
      from: 'Travel With Sohaib <onboarding@resend.dev>',
      to: ['sohaib.ikram7@gmail.com'],
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

    // 2️⃣ NEW — Forward data to Make.com webhook
    await fetch("https://hook.eu1.make.com/hg3x39ysgtynr5jrkowxue2br4yc3pe4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // 3️⃣ Final Response
    return res.status(200).json({
      message: 'Form submitted: Email sent + Make.com workflow triggered!'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
