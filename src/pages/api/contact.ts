/**
 * Contact Form API Endpoint
 * Handles POST requests for the contact form
 *
 * POST /api/contact
 * - Validates form data
 * - Sends email via nodemailer
 * - Returns success/error response
 */

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

interface ContactFormData {
	company: string;
	name: string;
	email: string;
	message: string;
}

interface ContactFormResponse {
	success: boolean;
	error?: string;
}

const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 1500;

// Sanitize input to prevent XSS
const sanitize = (value: string) =>
	value
		.replace(/[\r\n]+/g, ' ')
		.replace(/[<>]/g, (char) => ({ '<': '&lt;', '>': '&gt;' }[char] ?? ''))
		.trim();

// Validate email format
const isValidEmail = (email: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries()) as unknown as ContactFormData;

		// Check honeypot - if filled, it's likely a bot
		const honeypot = data.company || '';
		if (honeypot.trim().length > 0) {
			return new Response(
				JSON.stringify({ success: false, error: 'Invalid submission' } as ContactFormResponse),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Sanitize and extract form data
		const name = sanitize(String(data.name || ''));
		const email = String(data.email || '').trim().toLowerCase();
		const message = sanitize(String(data.message || ''));

		// Validation
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({ success: false, error: 'All fields are required' } as ContactFormResponse),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		if (!isValidEmail(email)) {
			return new Response(
				JSON.stringify({ success: false, error: 'Please provide a valid email' } as ContactFormResponse),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		if (name.length > MAX_NAME_LENGTH) {
			return new Response(
				JSON.stringify({ success: false, error: 'Name is too long' } as ContactFormResponse),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		if (message.length > MAX_MESSAGE_LENGTH) {
			return new Response(
				JSON.stringify({ success: false, error: 'Message exceeds allowed length' } as ContactFormResponse),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Get email credentials from environment
		const user = import.meta.env.ZOHOMAIL_USER;
		const pass = import.meta.env.ZOHOMAIL_PASS;

		if (!user || !pass) {
			console.error('Email credentials missing');
			return new Response(
				JSON.stringify({ success: false, error: 'Email service unavailable' } as ContactFormResponse),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Create email transporter
		const transporter = nodemailer.createTransport({
			host: 'smtp.zoho.in',
			port: 465,
			secure: true,
			auth: {
				user,
				pass,
			},
		});

		// Send email
		await transporter.sendMail({
			from: `"${name}" <contact@bhaveshp.dev>`,
			to: 'bhaveshpatil918@gmail.com',
			replyTo: email,
			subject: 'New Contact Form Submission',
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
			html: `
				<div style="max-width:480px;margin:32px auto;padding:24px;background:#f9fafb;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.07);font-family:sans-serif;color:#222;">
					<div style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:20px;">
						<h2 style="margin:0;font-size:1.5rem;color:#2563eb;">📬 New Contact Form Submission</h2>
					</div>
					<div style="margin-bottom:16px;">
						<strong style="display:inline-block;width:90px;color:#6b7280;">Name:</strong>
						<span>${name}</span>
					</div>
					<div style="margin-bottom:16px;">
						<strong style="display:inline-block;width:90px;color:#6b7280;">Email:</strong>
						<span>${email}</span>
					</div>
					<div style="margin-bottom:24px;">
						<strong style="display:block;color:#6b7280;margin-bottom:6px;">Message:</strong>
						<div style="background:#e0e7ef;padding:16px 14px;border-radius:8px;color:#222;white-space:pre-line;">${message}</div>
					</div>
					<div style="border-top:1px solid #e5e7eb;padding-top:12px;text-align:right;font-size:0.95rem;color:#6b7280;">
						<span>Sent from <a href="https://bhaveshp.dev" style="color:#2563eb;text-decoration:none;">bhaveshp.dev</a></span>
					</div>
				</div>
			`,
		});

		// Return success response
		return new Response(
			JSON.stringify({ success: true } as ContactFormResponse),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return new Response(
			JSON.stringify({ success: false, error: 'Failed to send message' } as ContactFormResponse),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
