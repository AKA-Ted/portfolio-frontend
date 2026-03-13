export const labels = {
  ES: {
    navbar: {
      home: 'Inicio',
      docs: 'Blog',
      language: 'Español'
    },
    statusMessages: {
      200: 'Operación exitosa',
      201: 'Recurso creado correctamente',
      400: 'Solicitud incorrecta',
      401: 'No autorizado',
      403: 'Acceso prohibido',
      404: 'No encontrado',
      500: 'Error interno del servidor',
      default: 'Ocurrió un error inesperado'
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
      scrollTop: 'Volver arriba',
      footer: 'Diseñado y construido por mí.'
    },
    sections: {
      experience: 'Experiencia',
      education: 'Educación',
      blog: {
        title: 'Documentación & Apuntes',
        publishedAt: 'Publicado el',
        noPosts: 'Aún no hay documentos publicados.',
        next: 'Siguiente',
        previous: 'Anterior',
        back: 'Volver a la lista'
      }
    }
  },
  EN: {
    navbar: {
      home: 'Home',
      docs: 'Blog',
      language: 'English'
    },
    statusMessages: {
      200: 'Operation successful',
      201: 'Resource created successfully',
      400: 'Bad request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not found',
      500: 'Internal server error',
      default: 'An unexpected error occurred'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      scrollTop: 'Scroll to top',
      footer: 'Designed and built by me.'
    },
    sections: {
      experience: 'Experience',
      education: 'Education',
      blog: {
        title: 'Documentation & Notes',
        publishedAt: 'Published on',
        noPosts: 'No documents published yet.',
        next: 'Next',
        previous: 'Previous',
        back: 'Back to list'
      }
    }
  }
};

export type Language = 'ES' | 'EN';
