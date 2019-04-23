import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Rate from "./Rate";
import Dashboard from "./Dashboard";
import axios from "axios";

const App = () => {
  const [breedList, changeBreedList] = useState(null);
  const [ratedDogs, changeRatedDogs] = useState({});

  useEffect(() => {
    const dogs = localStorage.getItem("ratedDogs");
    if (dogs) {
      const parsed = JSON.parse(dogs);
      changeRatedDogs(parsed);
    }
    const getBreedList = async () => {
      try {
        const res = await axios.get("https://dog.ceo/api/breeds/list/all");
        if (res.data.status !== "success") {
          throw new Error(res.data.error || "Error");
        }
        const list = res.data.message;
        const capitalize = name => `${name[0].toUpperCase()}${name.slice(1)}`;
        let optimizedList = [];
        Object.keys(list).forEach(item => {
          const subbreeds = list[item];
          if (subbreeds.length) {
            subbreeds.forEach(subBreed => {
              let name = `${capitalize(subBreed)} ${capitalize(item)}`;
              optimizedList.push({
                key: name,
                text: name,
                value: name
              });
            });
          } else {
            let name = capitalize(item);
            optimizedList.push({
              key: name,
              text: name,
              value: name
            });
          }
        });
        changeBreedList(optimizedList);
      } catch (e) {
        console.log(e);
      }
    };
    getBreedList();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Dashboard ratedDogs={ratedDogs} />}
        />
        <Route
          exact
          path="/rate"
          render={() => (
            <Rate
              breedList={breedList}
              changeRatedDogs={changeRatedDogs}
              ratedDogs={ratedDogs}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
