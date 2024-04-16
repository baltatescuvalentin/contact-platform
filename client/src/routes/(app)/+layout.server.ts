import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = ({ cookies }) => {
    const cookie = cookies.get('AuthorizationToken');

    return {
        cookie,
    }
}