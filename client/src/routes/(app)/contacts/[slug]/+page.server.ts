import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
    const slug: string = params.slug;
    const userEmail = locals.user?.email;

    const cookie = cookies.get('AuthorizationToken');

    if (cookie) {
        let contactInfo;
        let detailsInfo;

        const data = {
            contactUUID: slug,
        }

        const response1 = await fetch('http://localhost:3001/contact/getContactByUUID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie}`
            },
            body: JSON.stringify(data),
        });

        const status1 = response1.status;

        if (status1 === 200) {
            contactInfo = await response1.json();

            const detailsData = {
                contactUUID: slug,
            }

            const response2 = await fetch('http://localhost:3001/contactDetails/getDetailsOfContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                },
                body: JSON.stringify(detailsData),
            });

            const status2 = response2.status;

            if (status2 === 200) {
                detailsInfo = await response2.json();
            }
            else {
                error(404, 'Page not found! :(');
            }
        }
        else {
            error(404, 'Page not found! :(');
        }

        return {
            contactInfo: contactInfo.contact,
            detailsInfo: detailsInfo.details,
            cookie,
            contactUUID: slug,
        }
    }
    else {
        redirect(302, `/login?prev=${slug}`);
    }
}