import { useEffect, useState } from 'react';
import { House } from '@/models/house.interface';
import { useDebounce } from '@/hooks/useDebounce';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHouses = (searchValue: string = '') => {
    const [houses, setHouses] = useState<House[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchValue = useDebounce(searchValue, 300);

    useEffect(() => {
        const controller = new AbortController();
        console.log('New request initiated for:', debouncedSearchValue);
        
        const fetchHouses = async () => {
            setFetching(true);
            setError(null);

            try {
                const queryParam = debouncedSearchValue
                    ? `?name=${debouncedSearchValue}`
                    : '';
                const res = await fetch(`${API_URL}/houses${queryParam}`, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error('Failed to fetch houses');
                }
                const data: House[] = await res.json();
                setHouses(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.name === 'AbortError') {
                        console.log('Request was aborted for:', debouncedSearchValue);
                        return;
                    }
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

        return () => {
            console.log('Cleaning up request for:', debouncedSearchValue);
            controller.abort();
        };
    }, [debouncedSearchValue]);

    return { houses, fetching, error };
};