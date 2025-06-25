export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // ✅ Example: log the form data
    console.log('Received form data:', data);

    // ✅ Optionally send an email using a service like SendGrid or store in a DB here

    return res.status(200).json({ message: 'Form submitted successfully' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
