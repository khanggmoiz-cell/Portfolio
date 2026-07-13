import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, company, service, message } = body

  if (!name || !email || !phone || !service || !message) {
    return NextResponse.json(
      { success: false, error: 'All required fields must be filled' },
      { status: 400 },
    )
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#0C0C0C;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0C0C0C;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

            <tr><td style="background:linear-gradient(135deg,#18011F 0%,#7621B0 50%,#BE4C00 100%);border-radius:20px 20px 0 0;padding:40px 30px;text-align:center;">
              <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" width="100" height="110" alt="3D Character" style="margin-bottom:15px;" />
              <h1 style="color:#ffffff;font-size:24px;margin:0;font-weight:800;letter-spacing:1px;">NEW INQUIRY</h1>
              <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">from your portfolio</p>
            </td></tr>

            <tr><td style="background:#1a1a1a;padding:35px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Name</span><br/>
                    <span style="color:#ffffff;font-size:16px;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</span><br/>
                    <a href="mailto:${email}" style="color:#B600A8;font-size:16px;font-weight:600;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">WhatsApp</span><br/>
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color:#7621B0;font-size:16px;font-weight:600;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Company</span><br/>
                    <span style="color:#ffffff;font-size:16px;font-weight:600;">${company || 'N/A'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Service Required</span><br/>
                    <span style="display:inline-block;background:linear-gradient(135deg,#7621B0,#BE4C00);color:#ffffff;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;margin-top:4px;">${service}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 4px;">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Message</span><br/>
                    <div style="color:#D7E2EA;font-size:15px;line-height:1.7;margin-top:8px;background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">${message}</div>
                  </td>
                </tr>
              </table>
            </td></tr>

            <tr><td style="background:#111111;border-radius:0 0 20px 20px;padding:20px 30px;text-align:center;">
              <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;letter-spacing:1px;">Sent from Abdul Moiz Portfolio &bull; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </td></tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Inquiry: ${service} from ${name}`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 },
    )
  }
}
