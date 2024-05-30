import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    users: [],
    userTypes: []
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER_TYPES(state, userTypes) {
      state.userTypes = userTypes;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.sm_user_id !== userId);
    },
    EDIT_USER(state, updatedUser){
      const index = state.users.findIndex(user => user.sm_user_id === updatedUser.sm_user_id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    }
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axios.get('http://91.147.91.163:8888/api/crud/users');
        commit('SET_USERS', response.data.content.db_rows);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async getUserTypes({ commit }) {
      try {
        const response = await axios.get('http://91.147.91.163:8888/api/crud/user-types');
        commit('SET_USER_TYPES', response.data.content.db_rows);
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    },
    async addUser({ commit, dispatch }, newUser) {
      try {
        const response = await axios.post('http://91.147.91.163:8888/api/crud/users', newUser);
        const addedUser = response.data.content
        commit('ADD_USER', addedUser);
        await dispatch('getUsers');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    
    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`http://91.147.91.163:8888/api/crud/users/${userId}`);
        commit('DELETE_USER', userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async editUser({ commit,dispatch }, userData) {
      try {
        const userId = userData.sm_user_id; 
        await axios.put(`http://91.147.91.163:8888/api/crud/users/${userId}`, userData);
        commit('EDIT_USER', userData); 
        await dispatch('getUsers');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
});

export default store;
