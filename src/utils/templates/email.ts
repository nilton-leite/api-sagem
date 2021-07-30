const nodemailer = require('nodemailer')
export default class Email {
  static criaRemetente() {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      service: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    })
  }

  static criaInfoEmail(
    sendTo: String,
    subject: String,
    title: String,
    subtitle: String,
    envio: any
  ) {
    let dayName = [
      'domingo',
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
    ]
    let monName = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'agosto',
      'outubro',
      'novembro',
      'dezembro',
    ]
    let now = new Date()

    return {
      from: 'noreply@trizy.com.br',
      to: sendTo,
      subject: subject,
      html:
        `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link
                      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
                      rel="stylesheet"
                      type="text/css"
                    />
                    <style>
                      body {
                        font-family: Source Sans Pro;
                        margin: 0;
                        max-width: 600px;
                      }
  
                      .background {
                        padding: 24px;
                      }
  
                      .cover {
                        width: 100%;
                      }
  
                      .time {
                        font-size: 12px;
                        line-height: 15px;
                        letter-spacing: 0.04em;
                        text-transform: uppercase;
                        color: #8a8c8b;
                      }
  
                      .icon {
                        margin: 24px 8px 16px 0;
                      }
  
                      .subtitle {
                        margin: 16px 0;
                      }
  
                      h2 {
                        font-size: 20px;
                        line-height: 25px;
                        letter-spacing: -0.0047em;
                        color: #2980b9;
                      }
  
                      .productWrapper {
                        height: 72px;
                        padding-left: 8px;
                      }
  
                      .productList tbody tr .productWrapper:first-child {
                        padding-left: 0;
                      }
  
                      .product {
                        height: 64px;
                        width: 138px;
                        padding: 0 8px;
                        border: 1px solid #2980b9;
                        border-radius: 4px;
                        flex-direction: column;
                      }
  
                      .productName {
                        width: 130px;
                        font-weight: bold;
                        font-size: 14px;
                        line-height: 18px;
                        letter-spacing: -0.0047em;
                        max-width: 120px;
                        color: #125c86;
                      }
  
                      .productRow {
                        margin: 0;
                        font-size: 10px;
                        line-height: 13px;
                        letter-spacing: -0.0047em;
                        color: #2980b9;
                      }
  
                      .schedule {
                        width: 90%;
                      }
  
                      .trucks {
                        width: 70%;
                      }
  
                      .schedule th {
                        color: #616162;
                        padding-bottom: 8px;
                        width: 80px;
                        font-weight: bold;
                        font-size: 12px;
                        line-height: 15px;
                        letter-spacing: 0.04em;
                        text-align: left;
                      }
  
                      .schedule th:first-child {
                        width: 90px;
                      }
  
                      .schedule tr,
                      .trucks tr {
                        border: 1px solid #ededed;
                      }
  
                      .schedule td,
                      .trucks td {
                        margin-right: 8px;
                        font-size: 12px;
                        line-height: 15px;
                        letter-spacing: -0.0047em;
                        color: #2980b9;
                      }
  
                      .trucks th {
                        padding-bottom: 8px;
                        font-size: 12px;
                        line-height: 15px;
                        color: #a4a4ac;
                        letter-spacing: 0.04em;
                        text-align: left;
                      }
  
                      .trucks tfoot th {
                        color: #125c86;
                      }
  
                      .markedTrucks {
                        border: 1px solid #ededed;
                        font-size: 16px;
                        letter-spacing: -0.0047em;
                        color: #2980b9;
                      }
  
                      .arrow {
                        padding: 0 8px;
                      }
  
                      .rightPadded {
                        padding-right: 16px;
                      }
  
                      .leftBorded {
                        border-left: 1px solid #ededed;
                        padding: 0 16px;
                      }
  
                      .footer {
                        padding: 60px 0;
                        border-top: 1px solid #ededed;
                        border-bottom: 1px solid #ededed;
                        text-align: center;
                      }
  
                      .info {
                        font-family: Calibri;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        color: black;
                      }
  
                      .info a {
                        padding: 0 8px;
                      }
  
                      @media only screen and (max-width: 480px) {
                        .trucks {
                          width: 80%;
                        }
  
                        .schedule {
                          width: 100%;
                        }
  
                        .schedule th {
                          font-size: 11px;
                        }
  
                        .schedule td {
                          font-size: 11px;
                        }
  
                        .info {
                          font-size: 15px;
                        }
                      }
  
                      @media only screen and (max-width: 360px) {
                        .trucks {
                          width: 100%;
                        }
  
                        .content {
                          padding: 16px;
                        }
  
                        .schedule th {
                          font-size: 10px;
                          font-weight: 700;
                          line-height: 8px;
                          letter-spacing: -0.0047em;
                        }
  
                        .schedule td {
                          font-size: 10px;
                          font-weight: 400;
                          line-height: 13px;
                          letter-spacing: -0.0047em;
                        }
  
                        .info {
                          font-size: 13px;
                        }
                      }
                    </style>
                    <title>Segmentação Mahle</title>
                  </head>
                  <body>
                    <table class="background">
                      <tr>
                        <td>
                          <img
                            src="https://trizy.com.br/static/img/logo_600.png"
                            class="cover"
                            alt="Logo"
                          />
                          <h3 class="time">` +
        dayName[now.getDay()] +
        ', ' +
        now.getDate() +
        ' de ' +
        monName[now.getMonth()] +
        ' de ' +
        now.getFullYear() +
        ' ás ' +
        now.getHours() +
        ':' +
        now.getMinutes() +
        `</h3>
                          <table class="subtitle">
                            <tr>
                              <td>
                              <img
                                  src="https://trizy.com.br/static/img/graph.png"
                                  class="icon"
                                  alt="Graph"
                                />
                              </td>
                              <td style="padding: 0 4px" class="title">
                                <h2>${title}</h2>
                              </td>
                            </tr>
                          </table>
                                    <table class="productList">
                            <tbody>
                              <tr>
                                <td class="productWrapper">
                                  <td class="product">
                                    <table>
                                      <tbody>
                                        <tr class="productName">
                                          <td colspan="5">${subtitle}</td>
                                        </tr>` +
        this.montaTds(envio) +
        `</tbody>
                                    </table>
                                  </td>                  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table>
                            <tbody>
                              <tr>
                                <td style="padding: 16px 0"></td>
                              </tr>
                            </tbody>
                          </table>
                          <table width="100%" class="footer">
                            <tbody>
                              <tr>
                                <td style="padding: 0 16px"></td>
                                <td style="padding: 0 16px"></td>
                                <td>
                                  <a href="https://www.linkedin.com/company/apptrizy/">
                                    <img
                                      src="https://trizy.com.br/static/img/linkedin.png"
                                      alt="Linkedin"
                                    />
                                  </a>
                                </td>
                                <td>
                                  <a href="https://www.facebook.com/apptrizy/">
                                    <img
                                      src="https://trizy.com.br/static/img/facebook.png"
                                      alt="Facebook"
                                    />
                                  </a>
                                </td>
                                <td>
                                  <a href="https://www.instagram.com/apptrizy/">
                                    <img
                                      src="https://trizy.com.br/static/img/instagram.png"
                                      alt="Instagram"
                                    />
                                  </a>
                                </td>
                                <td>
                                  <a href="https://trizy.com.br/">
                                    <img
                                      src="https://trizy.com.br/static/img/site.png"
                                      alt="Site"
                                    />
                                  </a>
                                </td>
                                <td style="padding: 0 16px"></td>
                                <td style="padding: 0 16px"></td>
                              </tr>
                            </tbody>
                          </table>
                          <table>
                            <tbody>
                              <tr>
                                <td style="padding: 16px 0"></td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="info">
                            <i>Copyright © 2020 Trizy. Todos os direitos reservados.</i>
                            <div>
                              R. Ricardo Lustosa Ribas, 651 - Estrela, Ponta Grossa - PR,
                              84040-140
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>`,
    }
  }

  static montaTds(data: any) {
    let tds = ''
    for (let i = 0; i < data.length; i++) {
      tds += `<tr class="productRow">
                <td>${data[i].titulo}</td>
                <td style="padding: 0 4px"></td>
                <td>${data[i].qtde}</td>
              </tr>`
    }
    return tds
  }
}
