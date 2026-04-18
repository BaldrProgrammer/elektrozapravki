export default function getCords(cords:string): [number, number] {
    if (!cords) {
        throw new Error('Чезабретто с cords');
    }

    const parts = cords.trim().split(/\s+/);

    if (parts.length !== 2) {
        throw new Error(`Invalid coords format: ${cords}`);
    }

    const lat = Number(parts[0]);
    const lng = Number(parts[1]);

    if (isNaN(lat) || isNaN(lng)) {
        throw new Error(`Coords are not numbers: ${cords}`);
    }
    return[lng, lat]
}