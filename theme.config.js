import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Global/Footer";



export default {
    logo: <span>My Nextra Documentation</span>,
    useNextSeoProps: ()=>({
        titleTemplate: '%s | FruitSpace Docs',
    }),
    primaryHue: {
        dark: 210,
    },
    navbar: {
        component: <GlobalNav mainpage />
    },
    footer: {
        component: <Footer />
    },
    themeSwitch: {
        component: null
    },
    feedback: {
        content: null
    },
    editLink: {
        component: null
    }
}