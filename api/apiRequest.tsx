import dayjs from "dayjs";

export const fetchData = async () => {
    try {
        const currMonth = dayjs().format("MM");
        const currYear = dayjs().format("YYYY");

        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currYear}-${currMonth}-01&end_date=${currYear}-${currMonth}-06&api_key=dgljEdBwVghpuoTMj4emOKGqqxjFX8tM24dazM18`
        );

        return await response.json();
    } catch (error) {
        console.error("Error fetching NEO data:", error);
    }
};

export const fetchDataForDay = async (day: number) => {
    try {
        const currMonth = dayjs().format("MM");
        const currYear = dayjs().format("YYYY");

        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currYear}-${currMonth}-${day}&end_date=${currYear}-${currMonth}-${day}&api_key=dgljEdBwVghpuoTMj4emOKGqqxjFX8tM24dazM18`
        );

        return await response.json();
    } catch (error) {
        console.error("Error fetching NEO data:", error);
    }
};
