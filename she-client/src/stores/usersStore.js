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
      console.log('Loading state fetchUsers RUNNING:', this.loading);
      try {
        this.users = await userService.getUsers();
        console.log('Fetched users:', this.users);
        
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
        console.log('Fetch users operation completed.');
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
        console.error('Error fetching user:', err.message);
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
      console.log('Adding user with payload:', payload);
      this.loading = true;
      this.error = null;
      try {
        const newUser = await userService.createUser(payload);
        console.log('New user created:', newUser);
        // Tidak perlu push ke array karena akan di-refresh dengan fetchUsers()
        return newUser;
      } catch (err) {
        this.error = err.message || "Failed to add user.";
        console.error('Add user error:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});