import React, { useEffect, useState } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { fetchData } from "../api/apiRequest";
import { parseNEOData } from "../services/parseNeoData";
import { NEOData } from "../services/parseNeoData";
import { LinearProgress } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./neoList.scss";

const NEOList: React.FC = () => {
    const [neoList, setNeoList] = useState<NEOData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentItems, setCurrentItems] = useState<NEOData[]>([]);
    const [, setCurrentIndex] = useState(-1);
    const [currentBackground, setCurrentBackground] = useState<string[] | null>(
        null
    );

    useEffect(() => {
        fetchData()
            .then((res) => {
                if (Array.isArray(res)) {
                    setNeoList(parseNEOData(res));
                } else {
                    console.error("wrong data from server");
                }
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % neoList.length;
                const startIndex = nextIndex;
                const endIndex = (nextIndex + 6) % neoList.length;
                const updatedItems =
                    endIndex > startIndex
                        ? neoList.slice(startIndex, endIndex)
                        : [
                              ...neoList.slice(startIndex),
                              ...neoList.slice(0, endIndex),
                          ];
                setCurrentItems(updatedItems);
                setBackground(updatedItems);
                setIsLoading(false);
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [neoList]);

    const setBackground = (neos: NEOData[]) => {
        const sortedNeos = [...neos].sort(
            (a, b) =>
                b.potentially_hazardous_neos - a.potentially_hazardous_neos
        );
        setCurrentBackground([sortedNeos[0].id, sortedNeos[1].id]);
    };

    return (
        <>
            {isLoading ? (
                <>
                    <LinearProgress />
                    <Typography align="center" variant="h5" marginTop="20px">
                        Loading...
                    </Typography>
                </>
            ) : (
                <section style={{ display: "flex", gap: "20px" }}>
                    <TransitionGroup component={null}>
                        {currentItems.map((neo, index) => (
                            <CSSTransition
                                key={neo.id}
                                timeout={800}
                                classNames="neo-list-item"
                            >
                                <ListItem
                                    key={index}
                                    disablePadding
                                    sx={{
                                        backgroundColor:
                                            currentBackground?.includes(neo.id)
                                                ? "#ffcbcb"
                                                : "#9fd3c7",
                                        height: "345px",
                                        borderRadius: 5,
                                        boxShadow:
                                            "0 2px 4px rgba(20, 45, 76, 0.2)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            variant: "h6",
                                            align: "center",
                                            sx: { fontWeight: "bold" },
                                        }}
                                        primary={`Date: ${new Date(
                                            neo.id
                                        ).toLocaleDateString()}`}
                                    />
                                    <ListItemText
                                        primary={`Max Estimated Diameter: ${neo.max_estimated_diameter} km`}
                                        primaryTypographyProps={{
                                            align: "center",
                                        }}
                                    />
                                    <ListItemText
                                        primary={`Number of Potentially Hazardous NEOs: ${neo.potentially_hazardous_neos}`}
                                        primaryTypographyProps={{
                                            align: "center",
                                        }}
                                    />
                                    <ListItemText
                                        primary={`Closest NEO: ${neo.closest_neo} km`}
                                        primaryTypographyProps={{
                                            align: "center",
                                        }}
                                    />
                                    <ListItemText
                                        primary={`Fastest NEO: ${neo.fastest_neo} kph`}
                                        primaryTypographyProps={{
                                            align: "center",
                                        }}
                                    />
                                </ListItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </section>
            )}
        </>
    );
};

export default NEOList;
