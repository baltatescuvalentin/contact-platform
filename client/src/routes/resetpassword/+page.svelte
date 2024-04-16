<script lang="ts">
    import type { ActionData } from "./$types";
    import { enhance } from '$app/forms';
    export let form: ActionData;
</script>

<div class="container">
    <div class="auth_wrapper">
        <form class="auth_form" method="POST" use:enhance>
            <h2 id="auth_title">Login</h2>
            
            <div class="auth_input_wrapper">
                {#if form?.submit?.problem}
                    <p class="auth_error">{form?.submit?.message}</p>
                {/if}
                <input type="text" class="auth_input" placeholder="Email" id="email" name="email"/>
                {#if form?.errors?.email}
                    <label for="email" class="auth_error">{form?.errors?.email}</label>
                {/if}
                <input type="password" class="auth_input" placeholder="Password" id="password" name="password"/>
                {#if form?.errors?.password}
                    <label for="password" class="auth_error">{form?.errors?.password}</label>
                {/if}
                <input type="password" class="auth_input" placeholder="Confirm password" id="confirmPassword" name="confirmPassword"/>
                {#if form?.errors?.confirmPassword}
                    <label for="confirmPassword" class="auth_error">{form?.errors?.confirmPassword}</label>
                {/if}
                <button type="submit" class="auth_submit">
                    Submit
                </button>
            </div>
            <hr />
            <p class="auth_additional_message">Don't have an account? <a href="/register">Register</a></p>
        </form>
    </div>
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>