// src/utils/geo/geoUtils.ts

// Типы для результатов поиска
export interface SearchResult {
    lat: number;
    lon: number;
    displayName: string;
    address: {
        road?: string;
        house_number?: string;
        city?: string;
        town?: string;
        village?: string;
        country?: string;
        [key: string]: any;
    };
}

// Задержка между запросами к Nominatim
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

async function waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        await new Promise(resolve =>
            setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
        );
    }

    lastRequestTime = Date.now();
}

// Поиск адреса по тексту
export const searchAddress = async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    try {
        await waitForRateLimit();

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `format=json&q=${encodeURIComponent(query)}&` +
            `limit=5&addressdetails=1&accept-language=ru`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EnotApp/1.0'
                }
            }
        );

        if (!response.ok) {
            if (response.status === 429) {
                console.warn('Слишком много запросов, ждем...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                return searchAddress(query);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.map((item: any) => ({
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            displayName: item.display_name,
            address: item.address || {}
        }));
    } catch (error) {
        console.error('Ошибка поиска адреса:', error);
        return [];
    }
};

// Получение адреса по координатам
export const reverseGeocode = async (lat: number, lng: number): Promise<{
    displayName: string;
    address: any;
    shortName?: string;
} | null> => {
    try {
        await waitForRateLimit();

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?` +
            `format=json&lat=${lat}&lon=${lng}&` +
            `zoom=18&addressdetails=1&accept-language=ru`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EnotApp/1.0'
                }
            }
        );

        if (!response.ok) {
            if (response.status === 429) {
                console.warn('Слишком много запросов, ждем...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                return reverseGeocode(lat, lng);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Формируем короткий адрес
        const shortName = formatShortAddress(data.address);

        return {
            displayName: data.display_name,
            address: data.address || {},
            shortName
        };
    } catch (error) {
        console.error('Ошибка получения адреса:', error);
        return null;
    }
};

// Форматирование короткого адреса
export const formatShortAddress = (address: any): string => {
    if (!address) return '';

    const parts = [];

    if (address.road) parts.push(address.road);
    if (address.house_number) parts.push(address.house_number);
    if (address.city || address.town || address.village) {
        parts.push(address.city || address.town || address.village);
    }

    return parts.join(', ');
};

// Получение текущего местоположения браузера
export const getBrowserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Геолокация не поддерживается'));
            return;
        }

        // Опции для более точного определения
        const options = {
            enableHighAccuracy: true,  // Требуем высокой точности
            timeout: 10000,            // Таймаут 10 секунд
            maximumAge: 0              // Не использовать кэшированные данные
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Geolocation success:', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
                resolve(position);
            },
            (error) => {
                console.error('Geolocation error:', error.code, error.message);
                reject(error);
            },
            options
        );
    });
};

// Получение местоположения по IP
export const getLocationByIP = async (): Promise<{
    city: string;
    lat?: number;
    lng?: number;
    country?: string;
} | null> => {
    // Пробуем ip-api.com
    try {
        const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,city,lat,lon', {
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success' && data.city) {
                console.log('Данные по IP (ip-api):', data);
                return {
                    city: data.city,
                    lat: data.lat,
                    lng: data.lon,
                    country: data.country
                };
            }
        }
    } catch (error) {
        console.log('ip-api.com не доступен:', error);
    }

    // Пробуем geoplugin.net
    try {
        const response = await fetch('http://www.geoplugin.net/json.gp');
        if (response.ok) {
            const data = await response.json();
            if (data && data.geoplugin_city) {
                console.log('Данные по IP (geoplugin):', data);
                return {
                    city: data.geoplugin_city,
                    lat: parseFloat(data.geoplugin_latitude),
                    lng: parseFloat(data.geoplugin_longitude),
                    country: data.geoplugin_countryName
                };
            }
        }
    } catch (error) {
        console.log('geoplugin.net не доступен:', error);
    }

    return null;
};

// Проверка, находятся ли координаты в разумных пределах (Калининградская область)
export const areCoordinatesReasonable = (lat: number, lng: number): boolean => {
    // Калининградская область: примерно 54.3 - 55.3 широта, 19.5 - 22.9 долгота
    return (
        lat > 54.3 && lat < 55.3 &&
        lng > 19.5 && lng < 23.0
    );
};

// Координаты центра Калининграда
export const KALININGRAD_CENTER = {
    lat: 54.71,
    lng: 20.51
};

// Функция геокодирования для обратной совместимости
export const geocodeAddress = async (address: string): Promise<{
    lat: number;
    lng: number;
    displayName: string;
    address?: any;
} | null> => {
    try {
        await waitForRateLimit();

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `format=json&q=${encodeURIComponent(address)}&` +
            `limit=1&addressdetails=1&accept-language=ru`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EnotApp/1.0'
                }
            }
        );

        if (!response.ok) {
            if (response.status === 429) {
                console.warn('Слишком много запросов, ждем...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                return geocodeAddress(address);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                displayName: data[0].display_name,
                address: data[0].address || {}
            };
        }
        return null;
    } catch (error) {
        console.error('Ошибка геокодирования:', error);
        return null;
    }
};