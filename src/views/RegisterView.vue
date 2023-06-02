<template>
    <div class="card flex align-items-center justify-content-center">

        <Card style="width: 25em">
            <template #header>
                <img alt="user header" style="height: 100%; width: 100%; object-fit: contain'"
                    src="https://thumbs.dreamstime.com/b/smooth-water-1939005.jpg" />
            </template>
            <template #title> Register </template>
            <template #subtitle> Provide the credentials to register into our app </template>
            <template #content>
                <form>
                    <div class="flex flex-wrap  mb-1 gap-1">
                        <label for="name" class="p-sr-only">name</label>
                        <InputText style="width: 100%;" class="fullWidth" id="name" placeholder="name" v-model="name" />
                        <ValidationError v-if="v$.name.$error" style="width: 100%; background: none;">{{
                            v$.email.$errors[0].$message }}
                        </ValidationError>
                    </div>
                    <div class="flex flex-wrap  mb-1  gap-1">
                        <label for="email" class="p-sr-only">Email</label>
                        <InputText style="width: 100%;" class="fullWidth" id="email" placeholder="Email" v-model="email" />
                        <ValidationError v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}
                        </ValidationError>
                    </div>
                    <div class="flex flex-wrap  mb-1  gap-1">
                        <span class="p-input-icon-right" style="width: 100%">
                            <i class="pi pi-eye show" @click="this.showPassword = !showPassword" />
                            <label for="password" class="p-sr-only">Password</label>
                            <InputText class="fullWidth" style="width: 100%" :type="this.showPassword ? 'text' : 'password'"
                                id="password" placeholder="Password" v-model="password.password" />
                        </span>

                        <ValidationError v-if="v$.password.password.$error" style="width: 100%; background: none;">{{
                            v$.password.password.$errors[0].$message }}
                        </ValidationError>
                    </div>
                    <div class="flex flex-wrap  mb-1  gap-1">
                        <span class="p-input-icon-right" style="width: 100%">
                            <i class="pi pi-eye show" @click="this.showConfirmPassword = !showConfirmPassword" />
                            <label for="password" class="p-sr-only">Password</label>
                            <InputText style="width: 100%;" :type="this.showConfirmPassword ? 'text' : 'password'"
                                class="fullWidth" id="password" placeholder="Confirm password" v-model="password.confirm" />
                        </span>

                        <ValidationError v-if="v$.password.confirm.$error" style="width: 100%; background: none;">{{
                            v$.password.confirm.$errors[0].$message }}
                        </ValidationError>
                    </div>

                </form>
            </template>
            <template #footer>
                <Button @click.prevent="handleRegister" type="submit" icon="pi pi-check" label="Register" size="small" />
                <Button @click.prevent="this.$router.push({ name: 'LoginView' })" link icon="pi pi-check" label="Go login"
                    size="small" />
            </template>
        </Card>
    </div>
</template>
  
<script>
// component imports
import axios from "axios";
import Card from "primevue/card";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core'
import { required, email, helpers, minLength, sameAs } from '@vuelidate/validators'
import ValidationError from "../components/ValidationError.vue"

export default {
    name: "RegisterView",
    components: { Card, Button, InputText, ValidationError },
    data() {
        return {
            v$: useVuelidate(),
            showPassword: false,
            showConfirmPassword: false,
            email: "",
            password: {
                password: '',
                confirm: '',
            },
            name: "",
        };
    },
    validations() {
        return {
            email: { required: helpers.withMessage('Field is required', required), email },
            password: {
                password: { required: helpers.withMessage('Field is required', required), minLength: minLength(6) },
                confirm: { required: helpers.withMessage('Field is required', required), sameAs: sameAs(this.password.password) }
            },
            name: { required: helpers.withMessage('Field is required', required) }
        }
    },
    methods: {
        async handleRegister() {
            this.v$.$validate()

            try {
                const res = await axios.put("http://localhost:8082/auth/signup", {
                    email: this.email,
                    password: this.password.password,
                    name: this.name,
                });
                if (res.data.message === "User created!") {
                    this.$toast.open({
                        message: "Registerd",
                        type: "success",
                        // all of other options may go here
                    });
                    this.$router.push({ name: "LoginView" });
                }
            } catch (err) {
                console.log(err, "ERROR")
                this.$toast.open({
                    message: err.response.data.message || err.message,
                    type: "error",
                    position: "top-right"
                    // all of other options may go here
                });
            }
        },
    },
};
</script>
<style>
.show:hover {
    cursor: pointer;
}
</style>
  