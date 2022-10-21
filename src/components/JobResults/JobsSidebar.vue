<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" />
        </div>
      </div>

      <Accordion header="Degree" />

      <JobsSidebarJobTypes />

      <JobsSidebarOrganization />
    </section>
  </div>
</template>

<script setup>
import ActionButton from '@/components/Common/ActionButton.vue';
import Accordion from '@/components/Common/Accordion.vue';
import JobsSidebarOrganization from './JobsSidebarOrganization.vue';
import JobsSidebarJobTypes from './JobsSidebarJobTypes.vue';
</script>
