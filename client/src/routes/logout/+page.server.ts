import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies, locals }) => {
    cookies.delete('AuthorizationToken', {
        path: '/',
    });

    locals.user = undefined;

    redirect(302, '/login');
}