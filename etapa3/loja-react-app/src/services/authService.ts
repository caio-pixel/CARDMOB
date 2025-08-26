export async function fakeLogin(email: string, password: string):
Promise<string> {
    if (email === 'teste@exemple.com' && password === '123'){
        return Promise.resolve('fake-jwt-token');
    }
    return Promise.reject('Credenciais invalidas');
}