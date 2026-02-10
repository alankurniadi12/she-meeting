import api from "@/utils/api";

export async function getUsers() {
    const res = await api.apiGet('/users');
    return res.data;
}

export async function getUserById(id) {
    const res = await api.apiGet(`/users/detail/${id}`);
    return res.data;
}

export async function updateUser(id, userData) {
    const res = await api.apiPut(`/users/update/${id}`, userData);
    return res.data;
}

export default {
    getUsers,
    getUserById,
    updateUser
};