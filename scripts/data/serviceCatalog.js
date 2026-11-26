const serviceCatalog = Object.freeze([
  Object.freeze({
    name: 'Web Applications',
    nameEs: 'Aplicaciones web',
    lead: 'Easy-to-use web tools and visual dashboards built around how your business actually works.',
    leadEs:
      'Herramientas web y paneles visuales fáciles de usar, construidos alrededor de tus procesos reales.',
    benefits: Object.freeze([
      Object.freeze({
        key: 'guided-forms',
        label: 'Guided forms and clear screens for staff or customers',
        labelEs: 'Formularios guiados y pantallas claras para el personal o los clientes',
      }),
      Object.freeze({
        key: 'simple-tables',
        label: 'Simple tables and filters to track activity fast',
        labelEs: 'Tablas y filtros sencillos para revisar la actividad rápidamente',
      }),
      Object.freeze({
        key: 'responsive-performance',
        label: 'Smooth performance on desktop and mobile',
        labelEs: 'Buen rendimiento en escritorio y móvil',
      }),
    ]),
    fit: 'You want a custom portal, booking/request flow, or live status view.',
    fitEs:
      'Quieres un portal a medida, un flujo de reservas o solicitudes, o una vista de estado en tiempo real.',
  }),
  Object.freeze({
    name: 'Process Automation',
    nameEs: 'Automatización de procesos',
    lead: 'Connect your screens, rules, and data so routine work happens automatically instead of by hand.',
    leadEs:
      'Conecta pantallas, reglas y datos para que el trabajo repetitivo suceda de forma automática y no manual.',
    benefits: Object.freeze([
      Object.freeze({
        key: 'internal-tools',
        label: 'Custom internal tools for requests, schedules, and approvals',
        labelEs: 'Herramientas internas a medida para solicitudes, horarios y aprobaciones',
      }),
      Object.freeze({
        key: 'data-flow',
        label: 'Automatic data flow between tools and services',
        labelEs: 'Flujo automático de datos entre herramientas y servicios',
      }),
      Object.freeze({
        key: 'business-records',
        label: 'Organized, reliable storage for business records',
        labelEs: 'Almacenamiento organizado y confiable de registros empresariales',
      }),
    ]),
    fit: 'Your team spends too much time copying data across spreadsheets or emails.',
    fitEs:
      'Tu equipo dedica demasiado tiempo a copiar datos entre hojas de cálculo o correos.',
  }),
  Object.freeze({
    name: 'System Modernization',
    nameEs: 'Modernización de sistemas',
    lead: 'Upgrade slow or aging software step by step without disrupting daily operations.',
    leadEs:
      'Actualiza software lento o envejecido paso a paso, sin interrumpir las operaciones diarias.',
    benefits: Object.freeze([
      Object.freeze({
        key: 'gradual-upgrades',
        label: 'Safe, gradual upgrades instead of risky full rewrites',
        labelEs:
          'Actualizaciones graduales y seguras en lugar de reescrituras completas y riesgosas',
      }),
      Object.freeze({
        key: 'cleaner-code',
        label: 'Cleaner code and clear notes for future updates',
        labelEs: 'Código más limpio y notas claras para futuras actualizaciones',
      }),
      Object.freeze({
        key: 'dependable-performance',
        label: 'Faster, more dependable everyday performance',
        labelEs: 'Rendimiento diario más rápido y confiable',
      }),
    ]),
    fit: 'Your current system feels outdated, slow, or hard to change.',
    fitEs: 'Tu sistema actual se siente obsoleto, lento o difícil de cambiar.',
  }),
  Object.freeze({
    name: 'Support & Stability',
    nameEs: 'Soporte y estabilidad',
    lead: 'Practical help to fix nagging issues, clean up data, and keep your site or system steady.',
    leadEs:
      'Ayuda práctica para resolver problemas persistentes, limpiar datos y mantener estable tu sitio o sistema.',
    benefits: Object.freeze([
      Object.freeze({
        key: 'troubleshooting',
        label: 'Fast troubleshooting for bugs and recurring glitches',
        labelEs: 'Diagnóstico rápido de errores y fallos recurrentes',
      }),
      Object.freeze({
        key: 'data-cleanup',
        label: 'Data cleanup and routine system/server upkeep',
        labelEs: 'Limpieza de datos y mantenimiento básico de sistemas/servidores',
      }),
      Object.freeze({
        key: 'ongoing-support',
        label: 'Reliable ongoing support as needs come up',
        labelEs: 'Soporte continuo y confiable según surjan necesidades',
      }),
    ]),
    fit: 'You have lingering bugs, messy data, or no dedicated tech help.',
    fitEs: 'Tienes errores pendientes, datos desordenados o falta de soporte técnico dedicado.',
  }),
]);

const SERVICE_NAMES = Object.freeze(serviceCatalog.map((service) => service.name));

function getServiceByName(name) {
  return serviceCatalog.find((service) => service.name === name) ?? null;
}

function getServiceLabel(service, locale = 'en') {
  return locale === 'es' ? service.nameEs : service.name;
}

function getServiceFitText(service, locale = 'en') {
  return locale === 'es' ? service.fitEs : service.fit;
}

function getBenefitLabels(service, keys, locale = 'en') {
  return service.benefits
    .filter((benefit) => keys.includes(benefit.key))
    .map((benefit) => (locale === 'es' ? benefit.labelEs : benefit.label));
}

function serializeServiceCatalog(locale = 'en') {
  return serviceCatalog.map((service) => ({
    name: service.name,
    displayName: getServiceLabel(service, locale),
    lead: locale === 'es' ? service.leadEs : service.lead,
    fit: getServiceFitText(service, locale),
    benefits: service.benefits.map((benefit) => ({
      key: benefit.key,
      label: locale === 'es' ? benefit.labelEs : benefit.label,
    })),
  }));
}

export {
  serviceCatalog,
  SERVICE_NAMES,
  getServiceByName,
  getServiceLabel,
  getServiceFitText,
  getBenefitLabels,
  serializeServiceCatalog,
};
export default serviceCatalog;
