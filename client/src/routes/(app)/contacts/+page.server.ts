import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies, locals }) => {

    if (!locals.user) {
        redirect(302, '/login')
    }
    
    const cookie: string | undefined = cookies.get('AuthorizationToken');

    const userEmail: string = locals.user.email;

    const data = {
        userEmail: userEmail,
    }

    const response = await fetch('http://localhost:3001/contact/getContactsByUserEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie!}`,
        },
        body: JSON.stringify(data),
    });

    const status = response.status;
    const json = await response.json();

    if (status === 403) {
        redirect(302, '/login');
    }

    if (status === 500) {
        redirect(302, '/');
    } 

    return {
        cookie,
        contacts: json.contacts,
        userEmail: userEmail,
    }
}