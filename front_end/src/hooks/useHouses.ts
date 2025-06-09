import { useEffect, useState} from 'react';
import { House } from '@/models/house.interface';
import { useDebounce } from '@/hooks/useDebounce';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHouses = (searchValue: string = '') => {
    const [houses, setHouses] = useState<House[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use the custom hook to debounce the search value for 300 milliseconds
    const debouncedSearchValue = useDebounce(searchValue, 300); 

    useEffect( () => {
    
        const fetchHouses = async () => {

            setFetching(true);
            setError(null);

            try {
                const queryParam = debouncedSearchValue
                    ? `?name=${debouncedSearchValue}`
                    : '';
                const res = await fetch(`${API_URL}/houses${queryParam}`);
                
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
    }, [debouncedSearchValue]);

    return { houses, fetching, error };
};