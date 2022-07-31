// global variables
const defaultState = {
    cardSize: 20, // in mm -> 2cm
    numberOfCards: 16,
    colorA: "#8a2be2",
    colorB: "#0000ff",
    colorC: "#ffff00"
}

const onClickChangeColors = {
    colorA: "#000000",
    colorB: "#111111",
    colorC: "#ffffff"
}

// getting view functionality
const { createApp } = Vue;

// create App, add components, mount everything
createApp(
    {
        data() {
            return {
                hello: 'Hello! Here you can play with colors and number of squares...',
                appState: defaultState,
                change: 0 //used to catch change in child components, propagates via reactive props
            }
        },
        methods: {
            updateState(event) {
                // reading values from form, save in appState
                this.appState.cardSize = document.getElementById("size").value;
                this.appState.numberOfCards = document.getElementById("totalNumber").value;
                this.appState.colorA = document.getElementById("colorLarge").value;
                this.appState.colorB=document.getElementById("colorMedium").value;
                this.appState.colorC=document.getElementById("colorSmall").value;

                // this change will be noticed by the reactive props;
                this.change++;  
            },
        },
        computed: {
            wrapperStyle () {return "--size: " + this.appState.cardSize/10 + "cm;"},
            bugHelperArray () {
                // v-for seems to work with objects, but not with computed integers
                let a = [];
                for(let i=0; i<this.appState.numberOfCards; i++) {
                    a.push({b:i});
                }
                return a;
            }
        }
    }
)
.component('card-component', {
        template: '#card-template',
        data() {
            return {
                componentState: defaultState
            }
        },
        props: {
            'change': Number
        },
        methods: {
            updateFromParent() {
                this.componentState = this.$parent.appState;
            },
            onClickModifier() {
                this.componentState = onClickChangeColors;
            }
        },
        watch: {
            change () {
                this.updateFromParent();
            }
        },
        computed: {
            sizeSettings () {
                return "height: " + this.$parent.appState.cardSize/10 + "cm; width: "
                    + this.$parent.appState.cardSize/10 + "cm;";
                },
            styleA () {
                return "background-color: " + this.componentState.colorA + "; " + this.sizeSettings;
            },
            styleB () {return "background-color: " + this.componentState.colorB + ";"},
            styleC () {return "background-color: " + this.componentState.colorC + ";"}
        }
    }
)
.mount('#app');

