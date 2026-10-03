import { Resend } from 'resend';

interface ContactRequest {
  name?: unknown;
  email?: unknown;
  comments?: unknown;
}

function validateContact(body: ContactRequest) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const comments = typeof body.comments === 'string' ? body.comments.trim() : '';

  if (!name || name.length > 100) return { error: 'Enter a valid name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Enter a valid email address.' };
  }
  if (!comments || comments.length > 5_000) {
    return { error: 'Enter a message up to 5,000 characters.' };
  }

  return { name, email, comments };
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ error: 'Send a valid JSON request.' }, { status: 400 });
  }

  const contact = validateContact(body);
  if ('error' in contact) {
    return Response.json(contact, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error('Contact email is missing required configuration.');
    return Response.json(
      { error: 'Contact email is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: contact.email,
    subject: `Portfolio contact from ${contact.name}`,
    text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.comments}`,
  });

  if (error) {
    console.error('Resend rejected contact email:', error.message);
    return Response.json(
      { error: 'Your message could not be delivered. Please try again later.' },
      { status: 502 },
    );
  }

  return Response.json({ message: 'Thanks! Your message has been sent.' });
}
