import { useState } from "react";

const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async () => {
        const res = await fetch('/api/send', {
            method: 'POST',
            headers: {
                "Content-Type": "Aplication/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails)
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div>
            <br />
            <h2 className="subtitulo" id="contact">Contactame</h2>
            <form className="formulario-contacto">
                <input
                    type='text'
                    placeholder='Nombre'
                    onChange={(e) => {
                        onFormUpdate('name', e.target.value)
                    }}
                ></input>
                <input
                    type='email'
                    placeholder='Correo'
                    onChange={(e) => {
                        onFormUpdate('email', e.target.value)
                    }}
                ></input>
                <textarea
                    placeholder='Mensaje'
                    onChange={(e) => {
                        onFormUpdate('message', e.target.value)
                    }}
                ></textarea>
                <button onClick={handleSubmit}>Enviar</button>
            </form>
        </div >
    )
}

export default Contact;