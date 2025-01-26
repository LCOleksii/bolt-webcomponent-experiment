<!-- <MOD id="App"> the application root element -->
<script>
    import ExampleController from "./controllers/ExampleController.svelte";
    export let id;
    export let view;
    export let debug = false;
</script>
<div class={debug?"component debug":"status"} data-id="{id}">
    {#if view==="example"}
        <ExampleController name="{view}" debug="{debug}"/>
    {/if}
</div>
<style>
    .component{
        display: block;
        height: 100%;
        width: 100%;
        background: lightblue;
    }

    .component.debug{
        border: green;
    }
</style>
<!-- <MOD id="App"> -->