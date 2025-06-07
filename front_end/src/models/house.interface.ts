import { Head } from "./head.interface";
import { Trait } from "./trait.interface";

export interface House {
    id: string;
    name: string;
    colors: string;
    founder: string;
    animal: string;
    element: string;
    ghost: string;
    commonRoom: string;
    heads : Head[];
    traits: Trait[];
}