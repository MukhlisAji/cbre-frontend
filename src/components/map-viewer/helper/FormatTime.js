export function formatDate(isoDate) {
    const date = new Date(isoDate);

    const optionsDate = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit'
    };

    const formattedDate = date.toLocaleDateString('id-ID', optionsDate);
    const formattedTime = date.toLocaleTimeString('id-ID', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
}