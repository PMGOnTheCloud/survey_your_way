<template>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">Login into your account</router-link>
        </p>
    </div>
    <form class="mt-8 space-y-6" @submit="register">
        <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
            <div v-for="(field, index) of Object.keys(errors)" :key="index">
                <div v-for="(error, subindex) of errors[field] || []" :key="subindex">
                    · {{ error }}
                </div>
            </div>
        </Alert>
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
                <label for="firstname" class="sr-only">First name</label>
                <input id="firstname" name="firstname" type="text" autocomplete="given-name" required="" v-model="user.firstname" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name" />
            </div>
            <div>
                <label for="surname" class="sr-only">Surname</label>
                <input id="surname" name="surname" type="text" autocomplete="family-name" v-model="user.surname" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Surname (optional)" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Password Confirmation</label>
                <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required="" v-model="user.password_confirmation" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password Confirmation" />
            </div>
        </div>

        <div>
        <button :disabled="loading" type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500' : loading}">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sign up
        </button>
        </div>
    </form>
</template>

<script setup>
    import { LockClosedIcon } from '@heroicons/vue/20/solid';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { ref } from "vue";
    import Alert from "./Alert.vue";

    const store = useStore();
    const router = useRouter();

    const user = {
        email: '',
        firstname: '',
        surname: '',
        password: '',
        password_confirmation: ''
    }

    const loading = ref(false);

    const errors = ref({});

    function register(ev) {
        ev.preventDefault();
        loading.value = true;
        store
            .dispatch('register', user)
            .then((res) => {
                loading.value = false;
                router.push({
                    name: 'Dashboard'
                })
            })
            .catch(err => {
                loading.value = false;
                if (err.response.status === 422) {
                    errors.value = err.response.data.errors;
                }
            });
    }
</script>
