<template>
    <div v-if="showEdit" class="edit shadow-xl">
        <form class="row g-3" @submit.prevent="submitForm">
            <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="form.name">
            </div>
            <div class="col-md-6">
                <label for="login" class="form-label">Login</label>
                <input type="text" class="form-control" id="login" v-model="form.login">
            </div>
            <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input type="text" class="form-control" id="password" v-model="form.password">
            </div>
            <div class="col-md-4">
                <label for="role" class="form-label">Role</label>
                <select id="role" class="form-select" v-model="form.role">
                    <option disabled>Choose...</option>
                    <option v-for="type in userTypesEdit" :key="type.id" :value="type.name">{{ type.name }}</option>
                </select>
            </div>
            <div class="col-12 d-flex w-100 justify-content-between">
                <button type="submit" class="btn btn-primary">Edit user</button>
                <button @click="closeEdit" class="btn btn-primary">Close</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EditUser',
    computed: {
        userTypesEdit() {
            return this.$store.state.userTypes;
        },

    },
    mounted() {
        if (this.user) {
            this.fillExistData(this.user);
        }
        
    },
    watch: {
        user: {
            handler(newValue) {
                if (newValue) {
                    this.fillExistData(newValue);
                }

            },
            deep: true
        }
    },
    props: {
        showEdit: {
            type: Boolean,
        },
        closeEdit: {
            type: Function,
        },
        userTypes: {
            type: Array,
        },
        user: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                id: '',
                name: '',
                login: '',
                password: '',
                role: ''
            }
        }
    },
    methods: {
        roleChanger(role) {
            switch (role) {
                case 'Администратор':
                    return 1;
                case 'Модератор':
                    return 2;
                case 'Пользователь':
                    return 3;
                default:
                    return 'Неизвестный тип';
            }
        },
        fillExistData(user) {
            this.form.name = user.name;
            this.form.login = user.login;
            this.form.password = user.password;
            this.form.role = "Пользователь"

        },
        async submitForm() {
            const updatedUser = {
                sm_user_id: this.user.sm_user_id,
                new_name: this.form.name,
                new_login: this.form.login,
                new_password: this.form.password,
                new_sm_user_type_id: this.roleChanger(this.form.role),
                new_user_type_id: this.roleChanger(this.form.role),
            };
            try {
                await this.$store.dispatch('editUser', updatedUser);
                this.closeEdit();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
    }
}
</script>

<style scoped>
.edit {
    display: block;
    position: absolute;
    background-color: white;
    width: 500px;
    height: min-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    background: none;
    border: none;
}
</style>
