const BASE_URL = "subs-expressjs-production.up.railway.app/api";

const getToken = () => localStorage.getItem('token');

const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseResponse = async (response, fallbackMessage) => {
    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(payload?.message || fallbackMessage);
    }

    return payload;
};

const pickList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

const pickEntity = (payload) => {
    if (!payload) return null;
    if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) return payload.data;
    if (payload.item && typeof payload.item === 'object') return payload.item;
    return payload;
};

const request = async (path, options = {}, fallbackMessage = 'Ошибка запроса') => {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {}),
        },
    });

    return parseResponse(response, fallbackMessage);
};

export const authService = {
    register: async (userData) => {
        return request('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }, 'Ошибка регистрации');
    },

    login: async (credentials) => {
        const data = await request('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        }, 'Неверный логин или пароль');

        if (data?.token) localStorage.setItem('token', data.token);
        return data;
    }
};

export const dataService = {
    // cards
    getCards: async () => pickList(await request('/cards', {}, 'Ошибка при получении карт')),
    createCard: async (cardData) => request('/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
    }, 'Ошибка при создании карты'),
    updateCard: async (id, cardData) => request(`/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
    }, 'Ошибка при обновлении карты'),
    deleteCard: async (id) => request(`/cards/${id}`, { method: 'DELETE' }, 'Ошибка при удалении карты'),

    // subscriptions
    getSubscriptions: async () => pickList(await request('/subs', {}, 'Ошибка при получении подписок')),
    getUpcoming: async () => pickList(await request('/subs/upcoming', {}, 'Ошибка при получении ближайших списаний')),
    createSubscription: async (subscriptionData) => request('/subs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData),
    }, 'Ошибка при создании подписки'),
    getSubscriptionById: async (id) => pickEntity(await request(`/subs/${id}`, {}, 'Ошибка при получении подписки')),
    deleteSubscription: async (id) => request(`/subs/${id}`, { method: 'DELETE' }, 'Ошибка при удалении подписки'),
    updateSubscriptionCard: async (id, card) => request(`/subs/${id}/card`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card }),
    }, 'Ошибка при обновлении карты подписки'),
    updateSubscriptionStatus: async (id, status) => request(`/subs/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    }, 'Ошибка при обновлении статуса подписки'),
    updateSubscriptionPeriodicity: async (id, periodicity) => request(`/subs/${id}/periodicity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ periodicity }),
    }, 'Ошибка при обновлении периодичности'),

    // users
    getUsers: async () => pickList(await request('/users', {}, 'Ошибка при получении пользователей')),
    getUserById: async (id) => pickEntity(await request(`/users/${id}`, {}, 'Ошибка при получении пользователя')),
};