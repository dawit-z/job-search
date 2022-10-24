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

      <JobsSidebarCheckboxGroup
        header="Job Types"
        :unique-values="uniqueJobs"
        :mutation="ADD_SELECTED_JOB_TYPES"
      />

      <JobsSidebarCheckboxGroup
        header="Organizations"
        :unique-values="uniqueOrgs"
        :mutation="ADD_SELECTED_ORGS"
      />
    </section>
  </div>
</template>

<script setup>
import { ADD_SELECTED_JOB_TYPES, ADD_SELECTED_ORGS } from '@/store/constants';
import ActionButton from '@/components/Common/ActionButton.vue';
import Accordion from '@/components/Common/Accordion.vue';
import JobsSidebarCheckboxGroup from './JobsSidebarGroup.vue';
import { useUniqueJobs, useUniqueOrgs } from '@/store/composables';

const uniqueJobs = useUniqueJobs();
const uniqueOrgs = useUniqueOrgs();
</script>
