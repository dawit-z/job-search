const { computed, reactive, toRefs } = require('vue');

const person = reactive({
  firstName: 'John',
  lastName: 'Doe',
});

const { firstName, lastName } = toRefs(person);

const title = computed(() => `${firstName.value} ${lastName.value} the Great`);
console.log(title.value);

person.firstName = 'Timothy';
console.log(title.value);

person.lastName = 'Apple';
console.log(title.value);
