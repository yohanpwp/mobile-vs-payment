const showOnlyAvailableText = (text: string | undefined): string => {
    return text ? text : '-';
}  

export const displayText = { showOnlyAvailableText }