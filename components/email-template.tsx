import * as React from 'react';

interface EmailTemplateProps {
    name: string,
    email: string,
    message: string;
}

export const EmailTemplate = ({
    name, email, message
}) => (
    <div>
        <h1>Hola, mi nombre es {name}!</h1>
        <h3>{message}</h3><br />
        <h3>Puedes contactarme a travez de {email}</h3>
    </div>
);
