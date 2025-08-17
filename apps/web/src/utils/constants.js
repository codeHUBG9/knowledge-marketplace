export const API_BASE_URL = 'http://localhost:5000/api';

export const AUTH_TOKEN_KEY = 'authToken';

export const USER_ROLES = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    EXPERT: 'expert',
    ASKER: 'asker',
};

export const TRANSACTION_TYPES = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
};

export const REVIEW_RATINGS = [1, 2, 3, 4, 5];

export const DEFAULT_PAGE_SIZE = 10;

export const SOCKET_EVENTS = {
    MESSAGE: 'message',
    TYPING: 'typing',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
};