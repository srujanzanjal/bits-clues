import { useState, useEffect } from 'react';
import { Config } from '../types/config';

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/config/config.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        return response.json();
      })
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
}
