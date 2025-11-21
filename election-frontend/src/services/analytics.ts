import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID, {
      testMode: import.meta.env.DEV, // Send data to GA even in localhost, but marks it as test
      gaOptions: {
        debug_mode: true, // Forces events to show in DebugView
      }
    });
    console.log('GA Initialized with ID:', MEASUREMENT_ID);
  } else {
    console.warn('GA Measurement ID is missing. Analytics will not be tracked.');
  }
};

export const logPageView = () => {
  if (MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
