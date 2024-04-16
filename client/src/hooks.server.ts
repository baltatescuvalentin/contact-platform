import { VITE_JWT_SECRET } from "$env/static/private";
import { JWT_SECRET } from "$lib/utils/variables";
import type { Handle } from "@sveltejs/kit";
import jwt, { type JwtPayload } from 'jsonwebtoken';


export const handle: Handle = async ({ event, resolve }) => {
    const authToken: string | undefined = event.cookies.get('AuthorizationToken');

    try {
        if (!authToken) {
            event.locals.user = undefined;
        }

        if (authToken) {
            // change VITE_JWT_SECRET here with JWT_SECRET
            const claims: string | JwtPayload = jwt.verify(authToken, VITE_JWT_SECRET);  
            
            if (!claims || typeof claims === 'string') {
                event.locals.user = undefined;
            }
            else {
                const { email } = claims;
                const data = {
                    email: claims.email,
                }
                const response = await fetch('http://localhost:3001/auth/userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const json = await response.json();

                event.locals.user = {
                    firstname: json.userData.firstname,
                    lastname: json.userData.lastname,
                    email: json.userData.email,
                };
            }
        }
    }
    catch(error) {
        console.error(error);
    }

    return await resolve(event);
}