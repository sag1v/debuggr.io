import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import newsletter from '../../content/assets/newsletter.png';

const Field = ({ className, ...rest }) => (
    <input
        className={`field ${className}`}
        {...rest}
    />
)

const initialForm = {
    name: '',
    email: ''
}

function Subscribe() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({ result: '', msg: '' });

    const handleChange = ({ target }) => {
        setForm(state => ({
            ...state,
            [target.name]: target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.name && form.email) {
            const res = await addToMailchimp(form.email, { FNAME: form.name });
            const isSuccess = res.result === 'success';
            setStatus(res);
            if (isSuccess) {
                setForm(initialForm);
            }
        }
    }

    return (
        <div className="subscription-container">
            <div className="subscription-title">
                <h3>Keep in touch</h3>
                <div>Subscribe to get the latest posts by Email</div>
                <img
                    src={newsletter}
                    alt="open envelope with a letter which it's title is debuggr.io"
                    style={{
                        background: 'transparent',
                        width: '100px',
                        margin: '50px 0 0 0'
                    }}
                />
            </div>

            <div className="subscription-form-wrapper">

                <form onSubmit={handleSubmit}>
                    <Field required name="name" type="text" value={form.name} placeholder="Your name" onChange={handleChange} />
                    <Field required name="email" type="email" value={form.email} placeholder="Your E-mail" onChange={handleChange} />
                    <button className="submit-btn">Subscribe</button>
                </form>
                <div>
                    <span>No spam, I promise!</span>
                    <span role="img" aria-label="Smiling Face With Halo"> 😇</span>
                </div>
                <span style={{ fontSize: '.8em' }}>You can unsubscribe at any time</span>
                <div className={`form-status ${status.result === 'error' ? 'status--error' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: status.msg }} />
                </div>
            </div>
        </div>
    )
}

export default Subscribe;
