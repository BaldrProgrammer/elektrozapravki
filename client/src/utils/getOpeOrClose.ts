export function getShopStatus(openingHours: string): "Открыто" | "Закрыто" {
    const daysMap: Record<string, number> = {
        "Вс": 0,
        "Пн": 1,
        "Вт": 2,
        "Ср": 3,
        "Чт": 4,
        "Пт": 5,
        "Сб": 6,
    };

    const now = new Date();
    const currentDay = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (!openingHours) return "Закрыто";

    const rules = openingHours
        .split(";")
        .map(r => r.trim())
        .filter(Boolean);

    for (const rule of rules) {
        const parts = rule.split(":");

        if (parts.length < 2) continue;

        const day = parts[0].trim();
        const time = parts.slice(1).join(":").trim();

        const dayIndex = daysMap[day];
        if (dayIndex === undefined) continue;

        if (dayIndex !== currentDay) continue;

        const [start, end] = time.split("-");

        if (!start || !end) continue;

        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);

        const startMinutes = sh * 60 + sm;
        let endMinutes = eh * 60 + em;

        if (end === "24:00") {
            endMinutes = 24 * 60;
        }

        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
            return "Открыто";
        }
    }

    return "Закрыто";
}