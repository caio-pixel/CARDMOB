import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getOrders(user: { token: string } | null): Promise<any> {
    if (!user) return [];

    const response = await fetch(`${apiUrl}/api/orders`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
    });

    return response.json();
}

export async function updateOrderStatus(
    orderId: number,
    status: string,
    user: { token: string } | null
): Promise<any> {
    if (!user) return;

    const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
    });

    return response.json();
}
