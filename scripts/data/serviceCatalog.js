const serviceCatalog = Object.freeze([
  Object.freeze({
    name: 'Web Applications',
    lead: 'Easy-to-use web tools and visual dashboards built around how your business actually works.',
    benefits: Object.freeze([
      Object.freeze({ key: 'guided-forms', label: 'Guided forms and clear screens for staff or customers' }),
      Object.freeze({ key: 'simple-tables', label: 'Simple tables and filters to track activity fast' }),
      Object.freeze({ key: 'responsive-performance', label: 'Smooth performance on desktop and mobile' }),
    ]),
    fit: 'You want a custom portal, booking/request flow, or live status view.',
  }),
  Object.freeze({
    name: 'Process Automation',
    lead: 'Connect your screens, rules, and data so routine work happens automatically instead of by hand.',
    benefits: Object.freeze([
      Object.freeze({ key: 'internal-tools', label: 'Custom internal tools for requests, schedules, and approvals' }),
      Object.freeze({ key: 'data-flow', label: 'Automatic data flow between tools and services' }),
      Object.freeze({ key: 'business-records', label: 'Organized, reliable storage for business records' }),
    ]),
    fit: 'Your team spends too much time copying data across spreadsheets or emails.',
  }),
  Object.freeze({
    name: 'System Modernization',
    lead: 'Upgrade slow or aging software step by step without disrupting daily operations.',
    benefits: Object.freeze([
      Object.freeze({ key: 'gradual-upgrades', label: 'Safe, gradual upgrades instead of risky full rewrites' }),
      Object.freeze({ key: 'cleaner-code', label: 'Cleaner code and clear notes for future updates' }),
      Object.freeze({ key: 'dependable-performance', label: 'Faster, more dependable everyday performance' }),
    ]),
    fit: 'Your current system feels outdated, slow, or hard to change.',
  }),
  Object.freeze({
    name: 'Support & Stability',
    lead: 'Practical help to fix nagging issues, clean up data, and keep your site or system steady.',
    benefits: Object.freeze([
      Object.freeze({ key: 'troubleshooting', label: 'Fast troubleshooting for bugs and recurring glitches' }),
      Object.freeze({ key: 'data-cleanup', label: 'Data cleanup and routine system/server upkeep' }),
      Object.freeze({ key: 'ongoing-support', label: 'Reliable ongoing support as needs come up' }),
    ]),
    fit: 'You have lingering bugs, messy data, or no dedicated tech help.',
  }),
]);

const SERVICE_NAMES = Object.freeze(serviceCatalog.map((service) => service.name));

function getServiceByName(name) {
  return serviceCatalog.find((service) => service.name === name) ?? null;
}

function getBenefitLabels(service, keys) {
  return service.benefits
    .filter((benefit) => keys.includes(benefit.key))
    .map((benefit) => benefit.label);
}

export { serviceCatalog, SERVICE_NAMES, getServiceByName, getBenefitLabels };
export default serviceCatalog;
