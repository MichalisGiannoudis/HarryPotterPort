import { useEffect, useState} from 'react';
import { House } from '@/models/house.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHouses = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
    
        const fetchHouses = async () => {
        try {
            const res = await fetch(`${API_URL}/houses`);
            if (!res.ok) {
                throw new Error('Failed to fetch houses');
            }
            const data: House[] = await res.json();
            setHouses(data);
        } catch (err : unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setHouses([]);
        } finally {
            setFetching(false);
        }
    };

    fetchHouses();

  }, []);

    return { houses, fetching, error };
};