import {defineComponent} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export const ButtonCounter = defineComponent({
    props: {
        initialCount: Number
    },
    data() {
        return {
            count: this.initialCount
        };
    },
    methods: {
        onButtonClick() {
            this.count++;
            if(this.count % 5 === 0)
            this.$emit('count-divisible-by-five');
        }
    },
    template: `
    <button @click="onButtonClick">Counter {{ count }}</button>
    <p></p>
    `
});
    