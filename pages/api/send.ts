import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_3cMWWpdQ_GwhPyTForu1rkpQovFFVpxu3');

export default async (req, res) => {
    const datos = JSON.parse(req.body)
    console.log(datos.name)
    const nombre = datos.name;
    const correo = datos.email;
    const mensaje = datos.message;
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['santiagop.dev@gmail.com'],
        subject: 'Solicitud',
        react: EmailTemplate({ name: nombre, email: correo, message: mensaje }),
    });

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
};
