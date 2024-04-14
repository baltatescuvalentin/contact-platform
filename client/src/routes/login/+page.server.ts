import { fail, redirect } from '@sveltejs/kit';

import * as yup from 'yup';
import type { LoginFormType } from '$lib/utils/types';
import type { PageServerLoad } from './$types.js';

let errors: LoginFormType = {
    username: "",
    password: "",
}

const schema = yup.object().shape({
    username: yup.string().min(6, 'Min username length is 6').required('Username is required'),
    password: yup.string().min(8, 'Min password length is 8').required('Password is required'),
});


export const load: PageServerLoad = (event) => {
    const user = event.locals.user;

    if (user) {
        redirect(302, '/');
    }
}


export const actions = {
    default: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());

        console.log(formData);
    
        try {
            await schema.validate(formData, { abortEarly: false });
            console.log('Successfully validated');
            errors = {
                username: "",
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
            username: formData['username'],
            password: formData['password'],
        }

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const status = response.status;
        const json = await response.json();

        console.log(status, json);

        if (status === 404 || status === 400) {
            return fail(400, { 
                submit: {
                    message: json.message,
                    problem: true
                }
            })
        }

        cookies.set('AuthorizationToken', `${json.token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        })

        redirect(302, '/');
    }
}