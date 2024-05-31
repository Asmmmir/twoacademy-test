<template>
    <div v-if="modalShow" class="modal show">
        <form class="row g-3" @submit.prevent="submitForm">
            <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input required type="text" class="form-control" id="name" v-model="form.name" placeholder="Введите имя">
            </div>
            <div class="col-md-6">
                <label for="login" class="form-label">Login</label>
                <input required type="text" class="form-control" id="login" v-model="form.login" placeholder="Введите логин">
            </div>
            <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input required type="text" class="form-control" id="password" v-model="form.password" placeholder="Введите пароль">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Role</label>
                <select id="inputState" class="form-select" v-model="form.role">
                    <option selected disabled >Выберите роль</option>
                    <option :key="type" :value="type.name" v-for="type in userTypes">{{ type.name }}</option>
                </select>
            </div>
            <div class="col-12 d-flex w-100 justify-content-between">
                <button type="submit" class="btn btn-primary">Add User</button>
                <button @click="closeModal" class="btn btn-primary">Close</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddUser',
    data() {
        return {
            form: {
                id: '',
                name: '',
                login: '',
                password: '',
                role: '',
            }

        }
    },
    computed: {
        userTypes() {
            return this.$store.state.userTypes;
        }
    },
    created() {
        this.$store.dispatch('getUserTypes');
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
        async submitForm() {
            if((this.form.name.trim() || this.form.login.trim() || this.form.password.trim()).length <= 3 ) {
                alert('Заполните поля корректно')
                return;
            }
            const newUser = {
                name: this.form.name,
                login: this.form.login,
                password: this.form.password,
                sm_user_type_id: this.roleChanger(this.form.role),
                user_type_id: this.roleChanger(this.form.role),
            };
            try {
                await this.$store.dispatch('addUser', newUser);
                this.closeModal()
              
            }
            catch (error) {
                console.error('Error adding user:', error);
            }
        },
    },

    props: {
        modalShow: {
            type: Boolean,
            required: true
        },
        closeModal: {
            type: Function,
            required: true
        }
    }
}
</script>

<style scoped>
.modal.show {
    display: block;
    position: absolute;
    background-color: white;
    max-width: 500px;
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
