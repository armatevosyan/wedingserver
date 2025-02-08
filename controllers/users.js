const { Guests } = require('../models');
const nodemailer = require('nodemailer');

const addGuests = async (req, res) => {
    try {
        const { body } = req;

        await Guests.create(body);
        const data = await Guests.findAll({order:[['createdAt', 'DESC']]});

        const tableRows = data.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.count}</td>
      </tr>
    `).join('');

        const htmlTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f8f9fa;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Data from MySQL Table</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
            <div class="footer">
              <p>This email was sent automatically. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: 'notifydentist@gmail.com',
                pass: 'rolx wfhh kxqj oqhx',
            },
            service: 'Gmail',
            ignoreTLS: true,
            socketTimeout: 5000,
            requireTLS: true,
        });

        const mailOptions = {
            from: '"Wedding" <notifydentist@gmail.com>',
            to: ['matevosyan.2011@gmail.com', 'lilit-davtyan-99-99@mail.ru'],
            subject: 'Նոր Հյուրերի գրանցում',
            html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return res.status(200).json({
            message: 'Success'
        })
    } catch (e) {
        console.log('Catch for addGuests, ERROR', e);

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = { addGuests };