import { request } from 'undici';

export async function getid(username: string) {
    try {
        const response = await request('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: true,
            }),
        });

        const responseBody = await response.body.json();
        const id = (responseBody as any).data[0].id
        
        return await id
    } catch (e) {
        console.error(e);
    }
}