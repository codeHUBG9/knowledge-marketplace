import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useBids(questionId) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      if (!questionId) return;
      
      setLoading(true);
      try {
        const response = await api.get(`/bids/${questionId}`);
        setBids(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [questionId]);

  return { bids, loading, error };
}
