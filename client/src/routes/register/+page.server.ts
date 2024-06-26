
import { fail, redirect, type Load } from '@sveltejs/kit';

import * as yup from 'yup';
import type { RegisterFormType } from '$lib/utils/types';
import type { PageServerLoad } from './$types.js';


let errors: RegisterFormType = {
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
}

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    username: yup.string().min(6, 'Min username length is 6').required('Username is required'),
    firstname: yup.string().required('Firstname is required'),
    lastname: yup.string().required('Firstname is required'),
    password: yup.string().min(8, 'Min password length is 8').required('Password is required'),
});


export const load: PageServerLoad = (event) => {
    const user = event.locals.user;

    if (user) {
        redirect(302, '/');
    }
} 


export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
    
        try {
            await schema.validate(formData, { abortEarly: false });
            errors = {
                email: "",
                username: "",
                firstname: "",
                lastname: "",
                password: "",
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
            username: formData['username'],
            password: formData['password'],
            firstname: formData['firstname'],
            lastname: formData['lastname'],
        }

        const response = await fetch('https://contact-platform.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const status = response.status;
        const json = await response.json();

        if (status === 201) {
            redirect(302, '/login')
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