import { computed, reactive } from 'vue';

const person = reactive({
  name: 'Dawit',
});

const title = computed(() => person.name + ' the Great');
console.log(title.value);

person.name = 'Peter';
console.log(title.value);
