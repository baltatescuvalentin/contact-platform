import { fail, redirect } from '@sveltejs/kit';

import * as yup from 'yup';
import type { ExportFormType } from '$lib/utils/types';

let errors: ExportFormType = {
    email: "",
    password: "",
    confirmPassword: "",
}

const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Username is required'),
    password: yup.string().min(8, 'Min password length is 8').required('Password is required'),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], "Passwords must match"),
});


export const actions = {
    default: async ({ request}) => {
        const formData = Object.fromEntries(await request.formData());
    
        try {
            await schema.validate(formData, { abortEarly: false });
            errors = {
                email: "",
                password: "",
                confirmPassword: "",
            }
        }
        catch(error: any) {
            errors = error.inner.reduce((acc: any, err: any) => {
                return { ...acc, [err.path]: err.message};
            }, {});

            return fail(400, {
                errors: errors,
            })
        }

        const data = {
            email: formData['email'],
            password: formData['password'],
        }

        const response = await fetch('https://contact-platform.onrender.com/auth/resetpassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const status = response.status;
        const json = await response.json();

        if (status === 200) {
            redirect(302, '/login');
        }
        else {
            return fail(400, { 
                submit: {
                    message: json.message || json.error,
                    problem: true
                }
            })
        }
    }
}