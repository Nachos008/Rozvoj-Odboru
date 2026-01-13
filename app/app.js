import {createApp, ref} from 'vue';

function createCounter() {
    const count = ref(0);    
    function increment() {
        count.value++;
    }
    function decrement() {
        count.value--;
    }
    
    return {
        count,
        increment,
        decrement
    };
}

createApp({
    setup() {
        const counter= createCounter();
        
        return {
            counter
        }
    },
    template: `
    <div>
    <button @click="counter.decrement()">-</button>
    <span>{{ counter.count }}</span>
    <button @click="counter.increment()">+</button>
    </div>`
}).mount('#app');
