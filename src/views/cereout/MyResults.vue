<template>
    <div class="my_results">
        <!-- sidebar -->
            <SideBar style="float:left"/>
        <!-- /sidebar -->

        <!-- sub content -->

        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/SideBar'

    export default {
    name: 'dashboard',
      components: {
          SideBar,
      }
    }
</script>
