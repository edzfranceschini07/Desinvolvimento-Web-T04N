// netlify/functions/send-email.js
// Netlify Function para envio de e-mail via Nodemailer (SMTP)
// ---------------------------------------------------------------
// Configure as variáveis de ambiente no painel do Netlify:
//   EMAIL_USER  → seu e-mail (ex: petfeliz@gmail.com)
//   EMAIL_PASS  → senha de app do Gmail (não é a senha normal)
//   EMAIL_TO    → para quem receber os contatos (pode ser o mesmo)
// ---------------------------------------------------------------

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Só aceita POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido.' }),
    };
  }

  // Lê o corpo da requisição
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Requisição inválida.' }),
    };
  }

  const { name, email, phone, message } = body;

  // Validação mínima
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Nome, e-mail e mensagem são obrigatórios.' }),
    };
  }

  // Configuração do transportador SMTP (Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Pet Feliz Site" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `📬 Novo contato de ${name} — Pet Feliz`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2A9DC8; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">🐾 Novo Contato — Pet Feliz</h1>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #dde9f4; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #4A6A7A; font-size: 14px; width: 120px;"><strong>Nome</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #1E3A47;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #4A6A7A; font-size: 14px;"><strong>E-mail</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #1E3A47;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #4A6A7A; font-size: 14px;"><strong>Telefone</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #dde9f4; color: #1E3A47;">${phone || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #4A6A7A; font-size: 14px; vertical-align: top; padding-top: 14px;"><strong>Mensagem</strong></td>
              <td style="padding: 10px 0; color: #1E3A47; padding-top: 14px; white-space: pre-line;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #94B4C8;">
            Mensagem recebida via formulário do site petfeliz.com.br
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'E-mail enviado com sucesso!' }),
    };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar e-mail. Tente novamente.' }),
    };
  }
};