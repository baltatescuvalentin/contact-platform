import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = ({ locals }) => {

    const user = locals.user;

    if (!user) {
        redirect(302, '/login');
    }

    return {
        user,
    }
}