export type Category = 'Web Dev'
    | 'AI & Content'
    | 'Image & Video'
    | 'Finance & Calculators'
    | 'Time & Date'
    | 'Reading & Writing'
    | 'Business & Productivity'
    | 'Legal & Public Services'
    | 'Utilities';

export interface Tool {
    name: string;
    role: string;
    coreTechnology: string;
    fileName: string;
    icon: string;
    category: Category;
    isStatic?: boolean;
}
