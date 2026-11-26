const LOCALE_ALTERNATES = Object.freeze({
  portfolioEn: Object.freeze({ en: './', es: './es/' }),
  cvEn: Object.freeze({ en: './', es: '../es/' }),
  portfolioEs: Object.freeze({ en: '../', es: './' }),
  cvEs: Object.freeze({ en: '../../', es: '../' }),
});

const IMPROVEMENT_STRINGS = Object.freeze({
  en: Object.freeze({
    subject: 'Improvement Inquiry',
    dialogTitle: 'Tell Me What to Improve',
    dialogSubtitle: 'Describe the problem in plain language and see which service may help.',
    privacy:
      'The text you enter is sent to Google AI for improvement guidance. This page does not store it.',
    inputLabel: 'What would you like to improve?',
    placeholder: [
      'For example:',
      'Our booking requests are handled by email and people miss details.',
      'We need a clearer way to submit requests and see their status.',
    ].join('\n'),
    counterLimit: '(limit reached)',
    validation: 'Describe what you would like to improve.',
    failures: Object.freeze({
      config: 'Improvement guidance is unavailable right now. You can still email me directly.',
      network:
        'Improvement guidance could not reach the service. Please try again, or email me directly.',
      quota:
        'The AI service is busy right now. Please try again later, or email me directly.',
      http: 'Improvement guidance is unavailable right now. You can still email me directly.',
      timeout:
        'Improvement guidance took too long to respond. Please try again, or email me directly.',
      invalid:
        'The AI response could not be read. Please try again, or email me directly.',
      input: 'Describe what you would like to improve.',
    }),
    loading: 'Finding the closest service...',
    submit: 'Find the right service',
    submitLoading: 'Finding service...',
    submitCooldown: (seconds) => `Find the right service (${seconds}s)`,
    close: 'Close improvement inquiry',
    resultTitle: 'A practical place to start',
    benefitsTitle: 'Relevant benefits',
    questionsTitle: 'Questions to answer in your email',
    questionsNote: 'Answer any that apply in the email you send; no new inquiry is needed.',
    firstStepTitle: 'Suggested first step',
    emailBrief: 'Email this brief',
    emailFallback: 'Email me instead',
    startAnother: 'Start another inquiry',
    retry: 'Retry',
    statusReady: 'Service guidance ready.',
    emailIntro: 'Here is what I would like to improve:',
    goalLabel: 'Understood goal:',
    serviceLabel: 'Suggested service:',
    fitLabel: 'Why it may help:',
    firstStepLabel: 'Suggested first step:',
    understoodGoal: 'Understood goal:',
    suggestedService: 'Suggested service:',
    relevantBenefits: 'Relevant benefits:',
    suggestedEmail: 'Suggested email:',
    whyThisService: 'Why this service:',
  }),
  es: Object.freeze({
    subject: 'Consulta de mejora',
    dialogTitle: 'Dime qué mejorar',
    dialogSubtitle: 'Describe el problema en lenguaje sencillo y descubre qué servicio puede ayudarte.',
    privacy:
      'El texto que escribas se envía a Google AI para orientarte sobre mejoras. Esta página no lo almacena.',
    inputLabel: '¿Qué te gustaría mejorar?',
    placeholder: [
      'Por ejemplo:',
      'Nuestras solicitudes de reserva se manejan por correo y se pierden detalles.',
      'Necesitamos una forma más clara de enviar solicitudes y ver su estado.',
    ].join('\n'),
    counterLimit: '(límite alcanzado)',
    validation: 'Describe qué te gustaría mejorar.',
    failures: Object.freeze({
      config:
        'La orientación de mejora no está disponible en este momento. Puedes escribirme directamente.',
      network:
        'No se pudo conectar con el servicio de mejora. Inténtalo de nuevo o escríbeme directamente.',
      quota:
        'El servicio de IA está ocupado en este momento. Inténtalo más tarde o escríbeme directamente.',
      http:
        'La orientación de mejora no está disponible en este momento. Puedes escribirme directamente.',
      timeout:
        'La orientación de mejora tardó demasiado en responder. Inténtalo de nuevo o escríbeme directamente.',
      invalid:
        'No se pudo leer la respuesta de IA. Inténtalo de nuevo o escríbeme directamente.',
      input: 'Describe qué te gustaría mejorar.',
    }),
    loading: 'Buscando el servicio más cercano...',
    submit: 'Buscar el servicio adecuado',
    submitLoading: 'Buscando servicio...',
    submitCooldown: (seconds) => `Buscar el servicio adecuado (${seconds}s)`,
    close: 'Cerrar consulta de mejora',
    resultTitle: 'Un punto de partida práctico',
    benefitsTitle: 'Beneficios relevantes',
    questionsTitle: 'Preguntas para responder en tu correo',
    questionsNote: 'Responde las que apliquen en el correo que envíes; no hace falta iniciar otra consulta.',
    firstStepTitle: 'Primer paso sugerido',
    emailBrief: 'Enviar este resumen por correo',
    emailFallback: 'Escríbeme en su lugar',
    startAnother: 'Hacer otra consulta',
    retry: 'Reintentar',
    statusReady: 'Orientación de servicio lista.',
    emailIntro: 'Esto es lo que me gustaría mejorar:',
    goalLabel: 'Objetivo comprendido:',
    serviceLabel: 'Servicio sugerido:',
    fitLabel: 'Por qué puede ayudar:',
    firstStepLabel: 'Primer paso sugerido:',
    understoodGoal: 'Objetivo comprendido:',
    suggestedService: 'Servicio sugerido:',
    relevantBenefits: 'Beneficios relevantes:',
    suggestedEmail: 'Correo sugerido:',
    whyThisService: 'Por qué este servicio:',
  }),
});

const JOB_MATCH_STRINGS = Object.freeze({
  en: Object.freeze({
    title: 'Compare a vacancy',
    subtitle: 'Paste the vacancy text and see how it matches my profile.',
    privacy:
      'The vacancy text you paste is sent to Google AI for comparison. This page does not store it.',
    label: 'Vacancy description',
    placeholder: [
      'Paste the vacancy here, for example:',
      'Senior Frontend Developer (Remote)',
      'Must have: Angular, TypeScript, RxJS, REST APIs',
      'Nice to have: AWS, CI/CD',
      '5+ years building enterprise web applications',
    ].join('\n'),
    counterLimit: '(limit reached)',
    validation: 'Paste the vacancy text to compare.',
    failures: Object.freeze({
      config: 'AI comparison is unavailable right now. You can still email me or download my CV.',
      network:
        'AI comparison could not reach the service. Please try again, or email me or download my CV.',
      quota:
        'The AI service is busy right now. Please try again later, or email me or download my CV.',
      http: 'AI comparison is unavailable right now. You can still email me or download my CV.',
      timeout:
        'AI comparison took too long to respond. Please try again, or email me or download my CV.',
      invalid:
        'The AI response could not be read. Please try again, or email me or download my CV.',
      input: 'Paste the vacancy text to compare.',
    }),
    loading: 'Comparing vacancy with my profile...',
    submit: 'Compare vacancy',
    submitLoading: 'Comparing...',
    submitCooldown: (seconds) => `Compare vacancy (${seconds}s)`,
    close: 'Close vacancy comparison',
    resultTitle: 'Match result',
    matchedTitle: 'Matched skills',
    gapsTitle: 'Gaps',
    rationaleTitle: 'Rationale',
    emptyMatched: 'No clear matches found.',
    emptyGaps: 'No major gaps identified.',
    statusComplete: 'Comparison complete.',
    disclaimer: 'This is an AI-generated estimate, not a definitive judgement.',
    compareAnother: 'Compare another vacancy',
    emailInstead: 'Email me instead',
    emailMe: 'Email me',
    downloadCv: 'Download CV',
    verdictLabels: Object.freeze({
      strong: 'Strong match',
      partial: 'Partial match',
      weak: 'Weak match',
    }),
  }),
  es: Object.freeze({
    title: 'Comparar una vacante',
    subtitle: 'Pega el texto de la vacante y descubre qué tan cercano está a mi perfil.',
    privacy:
      'El texto de la vacante que pegues se envía a Google AI para compararlo. Esta página no lo almacena.',
    label: 'Descripción de la vacante',
    placeholder: [
      'Pega aquí la vacante, por ejemplo:',
      'Desarrollador Frontend Senior (Remoto)',
      'Requisitos: Angular, TypeScript, RxJS, APIs REST',
      'Deseable: AWS, CI/CD',
      'Más de 5 años de experiencia desarrollando aplicaciones web empresariales',
    ].join('\n'),
    counterLimit: '(límite alcanzado)',
    validation: 'Pega el texto de la vacante para compararla.',
    failures: Object.freeze({
      config:
        'La comparación con IA no está disponible en este momento. Puedes escribirme o descargar mi CV.',
      network:
        'No se pudo conectar con el servicio de comparación. Inténtalo de nuevo, o escríbeme o descarga mi CV.',
      quota:
        'El servicio de IA está ocupado en este momento. Inténtalo más tarde, o escríbeme o descarga mi CV.',
      http:
        'La comparación con IA no está disponible en este momento. Puedes escribirme o descargar mi CV.',
      timeout:
        'La comparación con IA tardó demasiado en responder. Inténtalo de nuevo, o escríbeme o descarga mi CV.',
      invalid:
        'No se pudo leer la respuesta de IA. Inténtalo de nuevo, o escríbeme o descarga mi CV.',
      input: 'Pega el texto de la vacante para compararla.',
    }),
    loading: 'Comparando la vacante con mi perfil...',
    submit: 'Comparar vacante',
    submitLoading: 'Comparando...',
    submitCooldown: (seconds) => `Comparar vacante (${seconds}s)`,
    close: 'Cerrar comparación de vacante',
    resultTitle: 'Resultado de la comparación',
    matchedTitle: 'Habilidades coincidentes',
    gapsTitle: 'Brechas',
    rationaleTitle: 'Justificación',
    emptyMatched: 'No se encontraron coincidencias claras.',
    emptyGaps: 'No se identificaron brechas importantes.',
    statusComplete: 'Comparación completada.',
    disclaimer: 'Esta es una estimación generada por IA, no un juicio definitivo.',
    compareAnother: 'Comparar otra vacante',
    emailInstead: 'Escríbeme en su lugar',
    emailMe: 'Enviar correo',
    downloadCv: 'Descargar CV',
    verdictLabels: Object.freeze({
      strong: 'Coincidencia alta',
      partial: 'Coincidencia parcial',
      weak: 'Coincidencia baja',
    }),
  }),
});

export function getLocale() {
  return document.documentElement.lang.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getLocaleStrings(section) {
  const locale = getLocale();

  if (section === 'improvement') {
    return IMPROVEMENT_STRINGS[locale];
  }

  if (section === 'jobMatch') {
    return JOB_MATCH_STRINGS[locale];
  }

  throw new Error(`Unknown locale string section: ${section}`);
}

export { LOCALE_ALTERNATES, IMPROVEMENT_STRINGS, JOB_MATCH_STRINGS };
