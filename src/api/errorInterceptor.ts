import { AxiosError } from 'axios';
import { toast } from '@/hooks/useToast';
import i18n from '@/locales/i18n';

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export function setupErrorInterceptor() {
  return (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    const t = (key: string) => i18n.t(key, { ns: 'errors' });

    let errorMessage = t('generic');

    if (!error.response) {
      errorMessage = t('network');
    } else {
      const status = error.response.status;
      const serverMessage = error.response.data?.message || error.response.data?.error;

      switch (status) {
        case 400:
          errorMessage = serverMessage || t('validation');
          break;
        case 403:
          errorMessage = t('forbidden');
          break;
        case 404:
          errorMessage = t('notFound');
          break;
        case 409:
          errorMessage = serverMessage || t('conflict');
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = t('serverError');
          break;
        default:
          errorMessage = serverMessage || t('generic');
      }
    }

    toast({
      title: 'Erro',
      description: errorMessage,
      variant: 'destructive',
    });

    return Promise.reject(error);
  };
}
