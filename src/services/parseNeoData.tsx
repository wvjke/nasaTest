export interface NEOData {
    id: string;
    max_estimated_diameter: number;
    potentially_hazardous_neos: number;
    closest_neo: number;
    fastest_neo: number;
}

export const parseNEOData = (data: any[]): NEOData[] => {
    const neoData: NEOData[] = [];

    data.forEach((item) => {
        for (const date in item.near_earth_objects) {
            const neoObjects = item.near_earth_objects[date];

            const neoDataObject: NEOData = {
                id: date,
                max_estimated_diameter: 0,
                potentially_hazardous_neos: 0,
                closest_neo: Infinity,
                fastest_neo: 0,
            };

            neoObjects.forEach((neo: any) => {
                const {
                    estimated_diameter,
                    is_potentially_hazardous_asteroid,
                    close_approach_data,
                } = neo;

                const estimatedDiameterMax =
                    estimated_diameter.meters.estimated_diameter_max;
                const isPotentiallyHazardous = is_potentially_hazardous_asteroid
                    ? 1
                    : 0;
                const missDistance = parseFloat(
                    close_approach_data[0].miss_distance.kilometers
                );
                const relativeVelocity = parseFloat(
                    close_approach_data[0].relative_velocity.kilometers_per_hour
                );

                if (
                    estimatedDiameterMax > neoDataObject.max_estimated_diameter
                ) {
                    neoDataObject.max_estimated_diameter = estimatedDiameterMax;
                }

                neoDataObject.potentially_hazardous_neos +=
                    isPotentiallyHazardous;

                if (missDistance < neoDataObject.closest_neo) {
                    neoDataObject.closest_neo = missDistance;
                }

                if (relativeVelocity > neoDataObject.fastest_neo) {
                    neoDataObject.fastest_neo = relativeVelocity;
                }
            });

            neoData.push(neoDataObject);
        }
    });

    return neoData;
};
