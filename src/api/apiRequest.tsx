/* eslint-disable @typescript-eslint/no-unsafe-return */
import dayjs from "dayjs";

export const fetchData = async () => {
    try {
        const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
        const daysInRange = dayjs().diff(startOfMonth, "day") + 1;

        const promises = Array.from({ length: daysInRange }, (_, index) => {
            const date = dayjs(startOfMonth)
                .add(index, "day")
                .format("YYYY-MM-DD");
            const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=dgljEdBwVghpuoTMj4emOKGqqxjFX8tM24dazM18`;
            return fetch(url);
        });

        const responses = await Promise.all(promises);
        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        return data;
    } catch (error) {
        console.error("Error fetching NEO data:", error);
    }
};
