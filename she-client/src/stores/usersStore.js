import { defineStore } from "pinia";
import * as userService from "@/services/userService";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    selectedUser: null,
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
            if (filters.sort === 'terbanyak') {
                
                return b.countFindings - a.countFindings
            } else {
                return a.countFindings - b.countFindings
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
    async fetchUserById(id) {
      this.loading = true;
      this.error = null;
      try {
        const user = await userService.getUserById(id);
        this.selectedUser = user;
        return user;
      } catch (err) {
        this.error = err.message || "Failed to fetch user.";
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async updateUser(id, userData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedUser = await userService.updateUser(id, userData);
        const index = this.users.findIndex((u) => u._id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        return updatedUser;
      } catch (err) {
        this.error = err.message || "Failed to update user.";
        throw err;
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