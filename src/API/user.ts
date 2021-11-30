export const userAPI = {
    getUsers: async () => {
        return await fetch(' https://api.github.com/users?per_page=10')
            .then((res) => {
                return res.json();
            })
    },
    getUsersByLogin: async (login: string) => {
        return await fetch(`https://api.github.com/users/${login}`)
            .then((res) => {
                return res.json();
            })
    }
}
