import { lazy, Suspense } from "react";
import { Header } from "./src/components/shared/Header";
import { Content } from "./src/components/shared/Content";
import { Layout } from "./src/styles/Layout";
import { useRoutes, Navigate } from "react-router-dom";
import { Loader } from "./src/components/shared/Loader";
//Lazy loading views
const PokemonList = lazy(() => import("./src/views/PokemonList"));
const PokemonOverview = lazy(() => import("./src/views/PokemonOverview"));

const App = () => {
  const paths = useRoutes([
    {
      path: "/pokemon",
      element: <Content />,
      children: [
        { path: "/pokemon", element: <PokemonList /> },
        { path: "/pokemon/:name", element: <PokemonOverview /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/pokemon" replace />,
    },
  ]);

  return (
    <Layout>
      <Header
        logo={
          <img
            src="https://fredwin.s3.eu-west-2.amazonaws.com/pokemon-logo.svg"
            alt="Pokémon logo"
            height="48px"
            width="128px"
          />
        }
      />

      <>
        <Suspense fallback={<Loader />}>{paths}</Suspense>
      </>
    </Layout>
  );
};

export default App;
