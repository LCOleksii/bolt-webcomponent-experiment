<script>
   import ExampleComponent from "../components/ExampleComponent.svelte";
   export let name = "";
   export let debug = "";  
</script>
<div class="controller" data-debug="{debug}" data-name={name}>
  <ExampleComponent name={name} debug={name} />
</div>