<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center mb-3">Test task</h1>

        <h3 class="mb-3">
          List of users
          <button @click="openModal" class="btn btn-primary addBtn">
            Add
          </button>
        </h3>
        <table class="table">
          <thead>
            <tr>
              <th class="bg-info" scope="col">ID</th>
              <th class="bg-info" scope="col">Name</th>
              <th class="bg-info" scope="col">Login</th>
              <th class="bg-info" scope="col">Password</th>
              <th class="bg-info" scope="col">Role</th>
              <th class="bg-info" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <th scope="row">{{ user.sm_user_id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.login }}</td>
              <td>{{ user.password }}</td>
              <td>{{ getUserRole(user.user_type_id) }}</td>
              <td class="d-flex justify-content-end gap-2">
                <button class="btn btn-primary" @click="editUser(user)">Edit</button>
                <button class="btn btn-danger" @click="deleteUser(user.sm_user_id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      <AddUser :modalShow="modalShow" :closeModal="closeModal"  />
      <EditUser :showEdit="showEdit" :closeEdit="closeEdit" :user="editUserDetails" :userTypes="userTypes" />
  </div>
</template>

<script>
import EditUser from './components/EditUser.vue'
import AddUser from './components/AddUser.vue'

export default {
  name: 'App',
  components: {
    AddUser,
    EditUser
  },
  data() {
    return {
      modalShow: false,
      showEdit: false,
      editUserDetails: null, 
    }
  },
  computed: {
    users(){
      return this.$store.state.users
    }
  },
  created() {
    this.$store.dispatch('getUsers');
  },
  methods: {
    getUserRole(id) {
      switch (id) {
        case 1:
          return 'Администратор';
        case 2:
          return 'Модератор';
        case 3:
          return 'Пользователь';
        default:
          return 'Неизвестный тип';
      }
    },
    openModal(){
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    closeEdit() {
      this.showEdit = false;
    },
    editUser(user) { 
      this.editUserDetails = user; 
      this.showEdit = true;
    },

    deleteUser(id) {
      this.$store.dispatch('deleteUser', id)
    .catch(error => {
      console.error('Error deleting user:', error);
    });
    }
  }
}
</script>

<style>
.addBtn {
  float: right;
}
</style>
