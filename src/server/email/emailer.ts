import sgMail = require('@sendgrid/mail');
import { MailData } from '@sendgrid/helpers/classes/mail';
import { environment } from '../environments/environment';

sgMail.setApiKey(environment.sendGrid.apiKey);
sgMail.setSubstitutionWrappers('{{', '}}');

export class Emailer {
    static fromEmail = 'admin@nean.io';
    static fromName = 'NEAN';

    static welcomeEmail(email: string, username: string, emailVerifyCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Welcome',
            templateId: environment.sendGrid.templates.welcome,
            substitutions: {
                username: username,
                emailverifycode: emailVerifyCode
            }
        };

        Emailer.send(data);
    }

    static forgotPasswordEmail(email: string, forgotPasswordCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Forgot Password',
            templateId: environment.sendGrid.templates.forgotPassword,
            substitutions: {
                forgotpasswordcode: forgotPasswordCode
            }
        };

        Emailer.send(data);
    }

    static feedbackEmail(content: string) {
        const data: MailData = {
            to: {
                email: 'admin@nean.io',
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Feedback',
            templateId: environment.sendGrid.templates.feedback,
            substitutions: {
                feedbackContent: content
            }
        };

        Emailer.send(data);
    }

    static resendEmailVerificationLinkEmail(email: string, emailVerifyCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Email verification',
            templateId: environment.sendGrid.templates.resendEmailVerificationLink,
            substitutions: {
                emailverifycode: emailVerifyCode
            }
        };

        Emailer.send(data);
    }

    static send(data: MailData) {
        if (!environment.production) {
            data.mailSettings = {
                sandboxMode: {
                    enable: true
                }
            };
        }

        sgMail.send(data, null, (err, res) => {
            if (err) {
                // TODO: save against profile that email failed to send (maybe)
            }
        });
    }
}
