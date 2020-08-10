export interface Menu {
    idMenu: number;
    name: string;
    description: string;
    route: string;
    icon: string;
    class: string;
    order: string;
    enabled: boolean;
    submenues: Menu[];
}
