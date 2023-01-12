export function classNames(classes: Record<string, boolean>) {
    return Object.entries(classes)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(' ');
}
