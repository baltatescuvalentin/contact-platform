<script lang="ts">
    import type { ActionData } from "./$types";
    import { enhance } from '$app/forms';
    export let form: ActionData;
</script>

<div class="container">
    <div class="auth_wrapper">
        <form class="auth_form" method="POST" use:enhance>
            <h2 id="auth_title">Register</h2>
            <div class="auth_input_wrapper">
                {#if form?.submit?.problem}
                    <p class="auth_error">{form?.submit?.message}</p>
                {/if}
                <input type="text" class="auth_input" placeholder="Email" id="email" name="email"/>
                {#if form?.errors?.email}
                    <label for="email" class="auth_error">{form?.errors?.email}</label>
                {/if}
                <input type="text" class="auth_input" placeholder="Username" id="username" name="username"/>
                {#if form?.errors?.username}
                    <label for="username" class="auth_error">{form?.errors?.username}</label>
                {/if}
                <input type="text" class="auth_input" placeholder="Firstname" id="firstname" name="firstname"/>
                {#if form?.errors?.firstname}
                    <label for="firstname" class="auth_error">{form?.errors?.firstname}</label>
                {/if}
                <input type="text" class="auth_input" placeholder="Lastname"  id="lastname" name="lastname"/>
                {#if form?.errors?.lastname}
                    <label for="lastname" class="auth_error">{form?.errors?.lastname}</label>
                {/if}
                <input type="password" class="auth_input" placeholder="Password"  id="password" name="password"/>
                {#if form?.errors?.password}
                    <label for="password" class="auth_error">{form?.errors?.password}</label>
                {/if}
                <button type="submit" class="auth_submit">
                    Submit
                </button>
            </div>
            <hr />
            <p class="auth_additional_message">Already have an account? <a href="/login">Log in</a></p>
        </form>
    </div>
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>