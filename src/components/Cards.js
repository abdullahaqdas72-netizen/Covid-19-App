import React from "react";
import "./Cards.css";

import CountUp from "react-countup";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Cards({ data }) {
  if (!data.confirmed) {
    return <h2>Loading...</h2>;
  }

  const cards = [
    {
      title: "Infected",
      value: data.confirmed,
      color: "infected",
      description: "Number of active COVID-19 cases.",
    },
    {
      title: "Recovered",
      value: data.recovered,
      color: "recovered",
      description: "Number of recoveries from COVID-19.",
    },
    {
      title: "Deaths",
      value: data.deaths,
      color: "deaths",
      description: "Number of deaths caused by COVID-19.",
    },
  ];

  return (
    <div className="cardsContainer">
      {cards.map((card, index) => (
        <Card className={`card ${card.color}`} key={index}>
          <CardContent>
            <Typography
              color="textSecondary"
              gutterBottom
              style={{ fontSize: "18px" }}
            >
              {card.title}
            </Typography>

            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "15px 0" }}
            >
              <CountUp
                start={0}
                end={card.value}
                duration={2.5}
                separator=","
              />
            </Typography>

            <Typography color="textSecondary">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>

            <Typography
              variant="body2"
              style={{ marginTop: "12px" }}
            >
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Cards;