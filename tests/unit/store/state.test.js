import state from '@/store/state';

describe('state', () => {
  it('keeps track of user login status', () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it('stores job listings', () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it('stores organizations to filter jobs', () => {
    const startingState = state();
    expect(startingState.selectedOrgs).toEqual([]);
  });

  it('stores job types to filter jobs', () => {
    const startingState = state();
    expect(startingState.selectedJobTypes).toEqual([]);
  });
});
