<template>
    <v-container>
        
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        getDictionary(){
            axios.get(backendPort + '/dictionary:id')
        },
        mounted: getDictionary()
    }
}
</script>