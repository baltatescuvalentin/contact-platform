<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import NavbarButton from "$lib/components/NavbarButton.svelte";
    import NavbarMobile from "$lib/components/NavbarMobile.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    let openMenu: boolean = false;

    const triggerNavbar = () => {
        openMenu = !openMenu;
    }
</script>


<div class="layout_container">
    <Navbar token={data.cookie}/>
    <NavbarMobile token={data.cookie} openMenu={openMenu} triggerNavbar={triggerNavbar}/>
    <NavbarButton triggerNavbar={triggerNavbar} />
    <div class="layout_elements">
        <slot></slot>
    </div>
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>
