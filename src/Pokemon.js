import React, { useEffect, useState } from "react";
import {  } from "@material-ui/core";
import {  Button, Card, Image, Loader, Grid, Container, List, Icon } from "semantic-ui-react";

import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
<Container 
    style = {{
      

        }}>
  <Grid centered columns={3}>
    <Grid.Column>
        <Card 
          style = {{
            backgroundColor: "transparent",
            top: "20px",
      
        }}>
        <Card.Content header={`#${id} ${toFirstCharUppercase(name)}`}  textAlign="center"
          style = {{
            backgroundColor: "#eee",     
        }}/>
        <Image src= {`${fullImageUrl}`}  
        style = {{
          backgroundColor: "transparent",
          
        }}/>
        <Card.Content 
            style = {{
           backgroundColor: "#eee",     
          }}>
            <Card.Header>Pokemon Info</Card.Header>
            <Card.Content extra>
            <span>
              <Icon name="star" />
              Espécie: {species.name}
            </span>   
            </Card.Content>
            <Card.Content extra>
            <span>
              <Icon name="star" />
              Altura: {height/10} m
            </span>
            </Card.Content>
            <Card.Content extra>
              <span>
              <Icon name="star" />
              Peso: {weight/10} Kg
              </span>
            </Card.Content>
            <Card.Content extra>
            <span>Tipo(s): </span>
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              
              return <List><List.Item key={name}><Icon name='right triangle' />{`${name}`}</List.Item></List>;
              
            })}
           </Card.Content>
          </Card.Content>
          
        </Card>
      </Grid.Column>
    </Grid>
    </Container>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <Loader />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <p> Pokemon not found</p>}

      {pokemon !== undefined && (
        <Button className="button"variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
};


export default Pokemon;

