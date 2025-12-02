import Constants from "expo-constants";

// Carrega o URL da API vindo do app.json
const { apiUrl } = Constants.expoConfig?.extra || {};

// Login fake (para testes)
export async function fakeLogin(email: string, password: string): Promise<string> {
  if (email === "teste@example.com" && password === "123") {
    return Promise.resolve("fake-jwt-token");
  }
  return Promise.reject("Credenciais inválidas");
}

// Login real na API
export async function requestLogin(email: string, password: string): Promise<string> {
  console.log("API_URL →", apiUrl);

  try {
    const response = await fetch(`${apiUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const jwt = data.accessToken;

    console.log("TOKEN RECEBIDO:", jwt);

    return Promise.resolve(jwt);
  } catch (error) {
    console.error("Erro no login:", error);
    return Promise.reject(error);
  }
}

// Registro de usuário
export async function requestRegister(
  name: string,
  email: string,
  password: string
): Promise<string> {
  try {
    const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    const jwt = data.accessToken;

    console.log("TOKEN APÓS REGISTRO:", jwt);

    return Promise.resolve(jwt);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return Promise.reject(error);
  }
}

// Decodifica o token JWT com segurança
export async function getTokenData(token: string | null): Promise<any> {
  try {
    if (!token) {
      console.warn("Nenhum token encontrado.");
      return null;
    }

    const parts = token.split(".");

    // Validação do formato do token JWT (3 partes)
    if (parts.length !== 3) {
      console.error("Token inválido ou incompleto:", token);
      return null;
    }

    const base64Url = parts[1];

    if (!base64Url) {
      console.error("Token sem payload:", token);
      return null;
    }

    // Corrige o formato do base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decodifica o JSON
    const payload = JSON.parse(atob(base64));

    return payload;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
