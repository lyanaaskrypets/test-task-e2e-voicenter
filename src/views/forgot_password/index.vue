<template>
    <div
        class="
            min-h-screen
            flex flex-col
            items-center
            justify-center
            bg-brand-burack
            py-10
            md:py-0
        "
    >
        <div
            class="
                flex flex-col
                justify-center justify-items-start
                w-36
                md:w-42
                2xl:w-96
            "
        >
            <svg
                class="w-full my-5"
                width="111"
                height="134"
                viewBox="0 0 111 134"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
        </div>
        <div
            class="
                w-3/4
                max-w-md
                lg:w-1/4
                space-y-8
                bg-brand-mainBlack
                py-5
                xl:px-10 xl:py-0
                rounded-lg
                shadow-xl
            "
        >
            <div>
                <h2
                    class="
                        text-center text-2xl
                        font-bold
                        text-brand-main
                        tracking-normal
                        xl:mt-5
                    "
                >
                  Відновити пароль
                </h2>
            </div>
            <p
                v-if="state.password"
                class="
                        text-center
                        text-white
                        tracking-normal
                        xl:mt-5
                    "
            >
                Пароль: <strong class="text-brand-main">{{ state.password }}</strong>
            </p>
            <form @submit="reset" class="mt-8 px-10 xl:p-0">
                <label class="block">
                    <span class="text-md font-medium text-brand-main"
                        >E-mail</span
                    >
                    <input
                        v-model="state.email.value"
                        type="email"
                        :class="{
                            'border-brand-danger': state.email.errorMessage,
                            'border-brand-burack': !state.email.errorMessage,
                        }"
                        data-cy="forgot-password-email-field"
                        class="
                            focus:outline-none focus:border-brand-main
                            text-gray-400
                            transition
                            duration-200
                            ease-in-out
                            block
                            w-full
                            px-4
                            py-3
                            mt-1
                            text-md
                            bg-brand-burack
                            border
                            rounded
                        "
                        placeholder="jane.doe@gmail.com" 
                        required
                    />
                    <span
                        v-if="!!state.email.errorMessage"
                        class="font-medium text-sm text-brand-danger"
                    >
                        {{ state.email.errorMessage }}
                    </span>
                </label>

                <div class="flex flex-col my-3">
                    <div class="text-sm text-right">
                        <router-link
                            :to="{ path: '/login' }"
                            class="font-medium text-brand-main underline-custom"
                            >Повернутися до входу?</router-link
                        >
                    </div>
                </div>

                <div class="w-full xl:pb-6 mt-5">
                    <button
                        type="submit"
                        class="
                            m-auto
                            w-full
                            flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            text-sm
                            font-semibold
                            rounded-md
                            text-white
                            bg-brand-main
                            hover:bg-brand-main
                            focus:outline-none
                            transition
                            duration-500
                            ease-in-out
                            transform
                            motion-safe:hover:scale-105
                        "
                    >
                        <span class="inline-block mr-2 text-base"
                            >Отримати пароль</span
                        >
                    </button>
                </div>
            </form>
            <p v-if="state.apiErrorMessage" class="font-medium text-sm text-brand-danger pb-5">
                {{ state.apiErrorMessage }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

import { useField } from 'vee-validate'

import {
    validateEmptyAndLength3,
    validateEmptyAndEmail,
} from '../../utils/validators'

import { useRouter } from 'vue-router'
import {loginUser, resetPassword} from "../../api/login";
import {loginData} from "../../state/login";

const router = useRouter()

const { value: emailValue, errorMessage: emailErrorMessage } = useField(
    'email',
    validateEmptyAndEmail
)

const { value: passwordValue, errorMessage: passwordErrorMessage } =
    useField('password', validateEmptyAndLength3)

const state = reactive({
    apiErrorMessage: null,
    hasErrors: false,
    isLoading: false,
    email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
    },
    password: null,
})

async function reset (e) {
    e.preventDefault()

    try {
        const { data } = await resetPassword(state.email.value)

        state.password = data.password
    } catch ({ response }) {
        state.apiErrorMessage = response.data.message
    }
}
</script>

<style scoped lang="postcss">
.underline-custom {
    position: relative;
}

.underline-custom::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    @apply bg-brand-main;
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
    .underline-custom:hover::before {
        left: 0;
        right: auto;
        width: 100%;
    }
}
</style>
