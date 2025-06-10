import { useMemo } from 'react';
import { HouseContent } from '@/models/content.interface';
import { contentMap } from '@/content';


export const useContent = (pageId: string): HouseContent | null => {
    return useMemo(() => {
        return contentMap[pageId] || null;
    }, [pageId]);
};
