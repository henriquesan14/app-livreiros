<template>
    <div id="dashboard" :class="{'hide-menu': !isMenuVisible}">
        <Header title="SGSL - Sistema Livreiros" />
        <Menu />
        <Content>
        </Content>
        <Footer />
    </div>
</template>

<script>
import { mapGetters} from 'vuex'
import Header from '../components/template/Header';
import Menu from '../components/template/Menu';
import Content from '../components/template/Content';
import Footer from '../components/template/Footer';

export default {
    name: 'Dashboard',
    components: {Header, Menu, Content, Footer},
    data(){
        return {
            windowWidth: 0
        }
    },
    computed: mapGetters(['isMenuVisible']),
    mounted(){
        this.$nextTick(() => {
         window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth
        });
        })
    },
    watch: {
        windowWidth(newWidth){
            this.handleResize(newWidth);
        }
    },
    created(){
        let largura = window.innerWidth;
        if (largura < 900) {
        this.$store.dispatch('toggleMenu', false);
        }else{
            this.$store.dispatch('toggleMenu', true);
        }  
    },
    methods:{
        handleResize(largura) {
            if (largura < 900) {
                this.$store.dispatch('toggleMenu', false);
            } else {
                this.$store.dispatch('toggleMenu', true);
            }
        }
    }
}
</script>

<style lang="scss">
    #dashboard{
        -webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
        height: 100vh;
        display: grid;
        grid-template-rows: 55px 1fr 30px;
        grid-template-columns: 200px 1fr;
        grid-template-areas: 
            "header header"
            "menu content"
            "menu footer";

        .hide-menu{
        grid-template-areas:
            "header header"
            "content content"
            "footer footer"
        }
    }
</style>
