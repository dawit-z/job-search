import getJobs from '@/api/getJobs';
import { FETCH_JOBS, RECIEVE_JOBS } from '@/store/constants';

const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECIEVE_JOBS, jobListings);
  },
};

export default actions;
