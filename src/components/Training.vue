<template>
    <v-container>
        <v-layout row>
            <v-flex xs1 sm1 md1></v-flex>
            <v-flex xs10 sm10 md10>
                This is training page
            </v-flex>
            <v-flex xs1 sm1 md1></v-flex>
        </v-layout>
        <v-layout>
            <v-divider inset></v-divider>
        </v-layout>
        <v-layout row>
            <v-flex xs1 sm1 md1></v-flex>
            <v-flex xs10 sm10 md10>
                <v-layout row wrap>
                    <v-flex xs6 md4>
                        <v-card color="gray">
                            <v-card-title>
                                <v-container>
                                    <v-layout>
                                        <v-flex xs12>
                                            2017暑假培训第一期
                                        </v-flex>
                                        <v-flex xs6>123</v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs1 sm1 md1></v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Training',
    data() {
        return {
            // 
        }
    }
}
</script>
<style lang="less" scoped>
</style>
