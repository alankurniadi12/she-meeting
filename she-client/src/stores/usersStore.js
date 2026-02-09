import { defineStore } from "pinia";
import * as userService from "@/services/userService";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  getters: {
    filteredUsers: (state) => (filters) =>  {
        let result = state.users.filter((p) => {
            const matchDivision =
                filters.division === 'Semua' ||
                p.division.toLowerCase().includes(filters.division.toLowerCase());

            const keyword = filters.search.toLowerCase();
            const matchSearch =
                !keyword || p.name.toLowerCase().includes(keyword);

            return matchDivision && matchSearch;
        });

        result = result.sort((a, b) => {
            if (filters.sort === 'tertinggi') {
                return b.jumlahTemuan - a.jumlahTemuan
            } else {
                return a.jumlahTemuan - b.jumlahTemuan
            }  
        });
        return result;
    },
  },
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await userService.getUsers();
      } catch (err) {
        this.error = err.message || "Failed to fetch users.";
      } finally {
        this.loading = false;
      }
    },

    async addUser(payload) {
      this.loading = true;
      this.error = null;
      try {
        const newUser = await userService.createUser(payload);
        this.users.push(newUser);
        return newUser;
      } catch (err) {
        this.error = err.message || "Failed to add user.";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});