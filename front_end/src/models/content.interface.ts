export interface HouseContent {
    pageId: string;
    founderLabel: string;
    houseSearchLabel: string;
    houseSearchEmptyResultsLabel: string;
    houseSearchErrorLabel: string;
    houseTraitSearchLabel: string;
}

export interface ContentMap {
    [key: string]: HouseContent;
} 