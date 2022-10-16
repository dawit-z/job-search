// Playground env to practice new concepts

// Arrays - order
// Objects - association
// Set - uniqueness

const jobs = [
  { title: 'Software Engineer', organization: 'Vue' },
  { title: 'Data Analyst', organization: 'Netflix' },
  { title: 'Vue Developer', organization: 'Vue' },
];

const result = jobs.filter((job) => job.organization === 'Vue');
console.log(result);
